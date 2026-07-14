#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const SKIP_EXT = new Set(['.mp4', '.mov', '.mkv', '.webm', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.zip', '.gz', '.tar', '.pdf', '.ico', '.onnx', '.tsbuildinfo']);
const RULES = [
  ['OpenAI key', /sk-(?:proj-)?[A-Za-z0-9_-]{20,}/g],
  ['Google API key', /AIza[0-9A-Za-z_-]{35}/g],
  ['GitHub token', /gh[pousr]_[A-Za-z0-9_]{30,}/g],
  ['Private key block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/g],
  ['Generic bearer token', /(?:bearer|token|api[_-]?key|secret)\s*[:=]\s*['"][A-Za-z0-9_./+=-]{32,}['"]/gi]
];

function fingerprint(value) {
  return crypto.createHash('sha256').update(value).digest('hex').slice(0, 12);
}

function isFixtureLine(relative, line) {
  return /(?:test|example|placeholder|dummy)/i.test(line)
    || /(?:^|\/)(?:test|tests|__tests__|fixtures|snapshots)\//.test(relative)
    || /\.env\.example$/.test(relative);
}

function scanLine(line, relative, lineNumber, commit = '') {
  const findings = [];
  for (const [name, rule] of RULES) {
    rule.lastIndex = 0;
    if (!rule.test(line)) continue;
    if (isFixtureLine(relative, line) && name === 'Private key block') continue;
    findings.push({ rule: name, file: relative, line: lineNumber, commit, fingerprint: fingerprint(`${commit}:${relative}:${line}`) });
  }
  return findings;
}

function candidateFiles() {
  try {
    return execFileSync('git', ['ls-files', '-co', '--exclude-standard'], { cwd: ROOT, encoding: 'utf8' })
      .split(/\r?\n/)
      .filter(Boolean)
      .map((file) => path.join(ROOT, file));
  } catch {
    return [];
  }
}

function scanWorkingTree() {
  const findings = [];
  for (const file of candidateFiles()) {
    if (SKIP_EXT.has(path.extname(file).toLowerCase())) continue;
    let text;
    try {
      const stat = fs.statSync(file);
      if (!stat.isFile() || stat.size > 1024 * 1024) continue;
      text = fs.readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    const relative = path.relative(ROOT, file);
    text.split(/\r?\n/).forEach((line, index) => findings.push(...scanLine(line, relative, index + 1)));
  }
  return findings;
}

function scanHistory() {
  let commits = [];
  try {
    commits = execFileSync('git', ['rev-list', '--all', '--max-count=500'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 })
      .split(/\r?\n/)
      .filter(Boolean);
  } catch {
    return [];
  }

  const findings = [];
  for (const commit of commits) {
    let patch = '';
    try {
      patch = execFileSync('git', ['show', '--format=', '--no-ext-diff', '--no-renames', '--unified=0', commit], {
        cwd: ROOT,
        encoding: 'utf8',
        maxBuffer: 30 * 1024 * 1024
      });
    } catch {
      continue;
    }
    let relative = '<unknown>';
    let lineNumber = 0;
    for (const rawLine of patch.split(/\r?\n/)) {
      const fileMatch = rawLine.match(/^\+\+\+ b\/(.+)$/);
      if (fileMatch) {
        relative = fileMatch[1];
        lineNumber = 0;
        continue;
      }
      const hunkMatch = rawLine.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
      if (hunkMatch) {
        lineNumber = Number(hunkMatch[1]);
        continue;
      }
      if (!rawLine.startsWith('+') || rawLine.startsWith('+++')) continue;
      const line = rawLine.slice(1);
      findings.push(...scanLine(line, relative, lineNumber || 1, commit.slice(0, 12)));
      lineNumber += 1;
    }
  }
  return findings;
}

const historyMode = process.argv.includes('--history');
const findings = historyMode ? scanHistory() : scanWorkingTree();

if (findings.length) {
  console.error(`Secret scan found ${findings.length} potential finding(s). Values are intentionally hidden.`);
  for (const f of findings) {
    const where = f.commit ? `${f.commit} ${f.file}:${f.line}` : `${f.file}:${f.line}`;
    console.error(`${f.rule} ${where} fingerprint=${f.fingerprint}`);
  }
  process.exit(1);
}
console.log(historyMode
  ? 'Git-history secret scan passed: no obvious secrets found in recent reachable commits.'
  : 'Secret scan passed: no obvious secrets found in tracked or unignored files.');
