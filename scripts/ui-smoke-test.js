"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");

const args = parseArgs(process.argv.slice(2));
const baseUrl = args.base || "http://127.0.0.1:3000";
const cdpUrl = args.cdp || "http://127.0.0.1:9222";
const outputDir = path.resolve(args.output || path.join(__dirname, "..", "release-test-output"));
const playwrightModuleDir = args["playwright-modules"] || process.env.PLAYWRIGHT_NODE_MODULES || "";
const tinyPngBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=";

function parseArgs(rawArgs) {
  const parsed = {};
  for (let index = 0; index < rawArgs.length; index += 1) {
    const item = rawArgs[index];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const next = rawArgs[index + 1];
    if (next && !next.startsWith("--")) {
      parsed[key] = next;
      index += 1;
    } else {
      parsed[key] = true;
    }
  }
  return parsed;
}

function loadPlaywright() {
  try {
    return require("playwright");
  } catch {
    if (!playwrightModuleDir) {
      throw new Error("Playwright is not installed. Pass --playwright-modules <node_modules>.");
    }

    return createRequire(path.join(playwrightModuleDir, "noop.js"))("playwright");
  }
}

async function waitForPost(page, oldText) {
  await page.waitForFunction(
    previous => {
      const output = document.querySelector("#post-output");
      return (
        output &&
        output.textContent.includes("как простить человека") &&
        output.textContent !== previous &&
        !/Генерирую|Подождите|генерац/i.test(output.textContent)
      );
    },
    oldText || "",
    { timeout: 120000 }
  );
}

async function waitForPoster(page) {
  await page.waitForFunction(
    () => {
      const status = document.querySelector("#poster-status");
      return (
        status &&
        status.textContent &&
        !/Подбираю|генерац|Генерирую|очіку|Poczekaj|Lütfen/i.test(status.textContent)
      );
    },
    null,
    { timeout: 150000 }
  );
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const uploadAssetPath = path.join(outputDir, "ui-smoke-upload.png");
  fs.writeFileSync(uploadAssetPath, Buffer.from(tinyPngBase64, "base64"));
  const playwright = loadPlaywright();
  const browser = await playwright.chromium.connectOverCDP(cdpUrl);
  const context = browser.contexts()[0] || await browser.newContext();
  const page = context.pages()[0] || await context.newPage();
  const consoleMessages = [];
  const requestFailures = [];
  const responseErrors = [];

  page.on("console", message => {
    consoleMessages.push(message.type() + ":" + message.text());
  });
  page.on("requestfailed", request => {
    requestFailures.push(request.url() + " " + ((request.failure() && request.failure().errorText) || "failed"));
  });
  page.on("response", response => {
    if (response.status() >= 400) {
      responseErrors.push(String(response.status()) + " " + response.url());
    }
  });
  await page.addInitScript(() => {
    window.localStorage.removeItem("shtunda13_postmaker_generation_history_v1");
  });

  await page.setViewportSize({ width: 1440, height: 1250 });
  await page.goto(baseUrl + "/desktop/?smoke=" + Date.now(), { waitUntil: "networkidle" });
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText(text) {
          window.__postMakerCopiedText = text;
          return Promise.resolve();
        },
      },
    });
  });
  await page.click("#support-open-btn");
  await page.waitForSelector("#support-modal:not(.hidden)", { timeout: 10000 });
  const supportModalVisible = await page.locator("#support-modal:not(.hidden)").count();
  await page.click("#support-modal button[data-modal-close='support-modal']");

  await page.click("#scripture-mode-btn");
  await page.waitForSelector("#scripture-mode-grid .option-card", { timeout: 10000 });
  const scriptureModeOptions = await page.locator("#scripture-mode-grid .option-card").count();
  await page.locator("#scripture-mode-grid .option-card").nth(Math.min(1, scriptureModeOptions - 1)).click();
  const scriptureModeButtonText = await page.locator("#scripture-mode-btn").innerText();

  await page.fill("#topic-input", "как простить человека, если боль не проходит");
  await page.click("#topic-submit-btn");
  await page.waitForSelector("#scripture-grid .scripture-card", { timeout: 90000 });
  const scriptureCount = await page.locator("#scripture-grid .scripture-card").count();
  const modalSubtitle = await page.locator("#modal-subtitle").innerText();

  await page.locator("#scripture-grid .scripture-card").first().click();
  await waitForPost(page);
  const firstPost = await page.locator("#post-output").innerText();

  await page.click("#post-style-btn");
  await page.waitForSelector("#post-style-grid .option-card", { timeout: 10000 });
  const styleButtons = page.locator("#post-style-grid .option-card");
  const styleCount = await styleButtons.count();
  await styleButtons.nth(styleCount - 1).click();
  await waitForPost(page, firstPost);
  const styledPost = await page.locator("#post-output").innerText();

  await page.click("#emoji-toggle-btn");
  await waitForPost(page, styledPost);
  const emojiPost = await page.locator("#post-output").innerText();

  await page.click("#copy-post-btn");
  await page.waitForFunction(() => Boolean(window.__postMakerCopiedText), null, { timeout: 10000 });
  const copiedText = await page.evaluate(() => window.__postMakerCopiedText || "");

  await page.click("#regenerate-post-btn");
  await waitForPost(page, emojiPost);
  const regeneratedPost = await page.locator("#post-output").innerText();

  await page.click("#poster-settings-btn");
  await page.selectOption("#poster-subject-select", "city");
  await page.selectOption("#poster-visual-style-select", "glitch");
  await page.selectOption("#poster-format-select", "square_1_1");
  await page.selectOption("#poster-layout-select", "center");
  await page.click("#poster-settings-apply-btn");
  await waitForPoster(page);
  const posterStatus = await page.locator("#poster-status").innerText();
  const posterSummary = await page.locator("#poster-options-summary").innerText();
  const canvasBox = await page.locator("#poster-canvas").boundingBox();
  const canvasDataPrefix = await page.locator("#poster-canvas").evaluate(canvas => canvas.toDataURL("image/png").slice(0, 80));

  const [referenceChooser] = await Promise.all([
    page.waitForEvent("filechooser", { timeout: 10000 }),
    page.click("#reference-upload-btn"),
  ]);
  await referenceChooser.setFiles(uploadAssetPath);
  await page.click("#poster-settings-btn");
  await page.waitForFunction(
    () => document.querySelector("#poster-reference-name")?.textContent.includes("ui-smoke-upload.png"),
    null,
    { timeout: 30000 }
  );
  const referenceNameAfterUpload = await page.locator("#poster-reference-name").innerText();
  const [logoChooser] = await Promise.all([
    page.waitForEvent("filechooser", { timeout: 10000 }),
    page.click("#poster-logo-upload-btn"),
  ]);
  await logoChooser.setFiles(uploadAssetPath);
  await page.waitForFunction(
    () => document.querySelector("#poster-logo-name")?.textContent.includes("ui-smoke-upload.png"),
    null,
    { timeout: 30000 }
  );
  const logoNameAfterUpload = await page.locator("#poster-logo-name").innerText();

  await page.click("#poster-logo-clear-btn");
  await page.waitForFunction(
    () => !document.querySelector("#poster-logo-name")?.textContent.includes("ui-smoke-upload.png"),
    null,
    { timeout: 10000 }
  );
  const logoNameAfterClear = await page.locator("#poster-logo-name").innerText();

  await page.click("#poster-reference-clear-btn");
  await page.waitForFunction(
    () => !document.querySelector("#poster-reference-name")?.textContent.includes("ui-smoke-upload.png"),
    null,
    { timeout: 10000 }
  );
  await waitForPoster(page);
  const referenceNameAfterClear = await page.locator("#poster-reference-name").innerText();

  await page.click("#poster-settings-reset-btn");
  await waitForPoster(page);
  const resetPosterSummary = await page.locator("#poster-options-summary").innerText();
  await page.keyboard.press("Escape");

  await page.click("#new-poster-btn");
  await waitForPoster(page);
  const newPosterStatus = await page.locator("#poster-status").innerText();

  await page.click("#export-presets-btn");
  await page.waitForSelector("#export-preset-grid .option-card", { timeout: 10000 });
  const exportPresetCount = await page.locator("#export-preset-grid .option-card").count();
  const presetDownload = await Promise.all([
    page.waitForEvent("download", { timeout: 30000 }),
    page.locator("#export-preset-grid .option-card").nth(Math.min(4, exportPresetCount - 1)).click(),
  ]).then(results => results[0]);
  const presetDownloadName = presetDownload.suggestedFilename();
  await presetDownload.saveAs(path.join(outputDir, presetDownloadName));
  await waitForPoster(page);

  await page.click("#history-btn");
  await page.waitForSelector("#history-modal:not(.hidden)", { timeout: 10000 });
  const historyCount = await page.locator("#history-list .history-card").count();
  const historyHasPreview = historyCount > 0
    ? await page.locator("#history-list .history-card").first().locator("img").count()
    : 0;
  await page.locator("#history-list .history-card").first().locator("button").nth(1).click();
  await page.click("#history-modal button[data-modal-close='history-modal']");

  const download = await Promise.all([
    page.waitForEvent("download", { timeout: 30000 }),
    page.click("#download-btn"),
  ]).then(results => results[0]);
  const downloadName = download.suggestedFilename();
  await download.saveAs(path.join(outputDir, downloadName));
  await page.screenshot({ fullPage: true, path: path.join(outputDir, "desktop-ui-smoke.png") });

  const mobile = await context.newPage();
  await mobile.setViewportSize({ width: 390, height: 844 });
  await mobile.goto(baseUrl + "/mobile/?smoke=" + Date.now(), { waitUntil: "networkidle" });
  await mobile.fill("#topic-input", "как не выгорать в служении");
  await mobile.click("#surprise-btn");
  const surpriseValue = await mobile.locator("#topic-input").inputValue();
  await mobile.click("#language-btn");
  await mobile.waitForSelector("#language-grid .option-card", { timeout: 10000 });
  const languageOptions = await mobile.locator("#language-grid .option-card").count();
  await mobile.locator("#language-grid .option-card").nth(Math.min(1, languageOptions - 1)).click();
  const languageButtonText = await mobile.locator("#language-btn").innerText();
  await mobile.screenshot({ fullPage: true, path: path.join(outputDir, "mobile-ui-smoke.png") });

  const report = {
    baseUrl,
    supportModalVisible: supportModalVisible > 0,
    scriptureModeOptions,
    scriptureModeButtonText,
    scriptureCount,
    modalSubtitle,
    firstPostLength: firstPost.length,
    styledChanged: styledPost !== firstPost,
    emojiChanged: emojiPost !== styledPost,
    copyWorked: copiedText === emojiPost,
    regenerateChanged: regeneratedPost !== emojiPost,
    posterStatus,
    newPosterStatus,
    posterSummary,
    referenceUploaded: referenceNameAfterUpload.includes("ui-smoke-upload.png"),
    referenceCleared: !referenceNameAfterClear.includes("ui-smoke-upload.png"),
    logoUploaded: logoNameAfterUpload.includes("ui-smoke-upload.png"),
    logoCleared: !logoNameAfterClear.includes("ui-smoke-upload.png"),
    settingsReset: resetPosterSummary !== posterSummary,
    resetPosterSummary,
    exportPresetCount,
    presetDownloadName,
    historyCount,
    historyHasPreview: historyHasPreview > 0,
    canvasBox,
    canvasDataPrefix,
    downloadName,
    surpriseValue,
    languageOptions,
    languageButtonText,
    consoleMessages: consoleMessages.slice(-12),
    requestFailures,
    responseErrors,
    screenshots: {
      desktop: path.join(outputDir, "desktop-ui-smoke.png"),
      mobile: path.join(outputDir, "mobile-ui-smoke.png"),
    },
  };

  fs.writeFileSync(path.join(outputDir, "ui-smoke-report.json"), JSON.stringify(report, null, 2));
  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}

main().catch(error => {
  console.error(error && error.stack ? error.stack : error);
  process.exitCode = 1;
});
