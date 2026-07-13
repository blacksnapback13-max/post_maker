#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');
const SKIP_EXT = new Set(['.mp4','.mov','.mkv','.webm','.png','.jpg','.jpeg','.gif','.webp','.zip','.gz','.tar','.pdf','.ico','.onnx','.tsbuildinfo']);
const RULES = [
  ['OpenAI key', /sk-(?:proj-)?[A-Za-z0-9_-]{20,}/g],
  ['Google API key', /AIza[0-9A-Za-z_-]{35}/g],
  ['GitHub token', /gh[pousr]_[A-Za-z0-9_]{30,}/g],
  ['Private key block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/g],
  ['Generic bearer token', /(?:bearer|token|api[_-]?key|secret)\s*[:=]\s*['"][A-Za-z0-9_./+=-]{32,}['"]/gi]
];
function candidateFiles(){try{return execFileSync('git',['ls-files','-co','--exclude-standard'],{cwd:ROOT,encoding:'utf8'}).split(/\r?\n/).filter(Boolean).map(f=>path.join(ROOT,f));}catch{return[];}}
let findings=[];
for(const file of candidateFiles()){
  if(SKIP_EXT.has(path.extname(file).toLowerCase())) continue;
  let text; try{const st=fs.statSync(file); if(!st.isFile()||st.size>1024*1024) continue; text=fs.readFileSync(file,'utf8');}catch{continue;}
  const relative=path.relative(ROOT,file);
  text.split(/\r?\n/).forEach((line,index)=>{
    const fixtureLine=/(?:test|example|placeholder|dummy)/i.test(line)||/(?:^|\/)(?:test|tests|snapshots)\//.test(relative)||/\.env\.example$/.test(relative);
    for(const [name,rule] of RULES){rule.lastIndex=0; if(!rule.test(line)) continue; if(fixtureLine&&name==='Private key block') continue; const fingerprint=crypto.createHash('sha256').update(line).digest('hex').slice(0,12); findings.push({rule:name,file:relative,line:index+1,fingerprint});}
  });
}
if(findings.length){console.error(`Secret scan found ${findings.length} potential finding(s). Values are intentionally hidden.`); for(const f of findings) console.error(`${f.rule} ${f.file}:${f.line} fingerprint=${f.fingerprint}`); process.exit(1);} console.log('Secret scan passed: no obvious secrets found in tracked or unignored files.');
