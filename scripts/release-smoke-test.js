"use strict";

const assert = require("node:assert/strict");
const { once } = require("node:events");
const {
  buildGeminiPrompt,
  buildImageProvidersUnavailableError,
  buildPollinationsPrompt,
  buildPostPrompt,
  buildScriptureSuggestionPrompt,
  createServer,
  normalizeSuggestedScriptures,
} = require("../server.js");

const args = new Set(process.argv.slice(2));
const runLiveText = args.has("--live-text") || args.has("--live-ai");
const runLiveImage = args.has("--live-image") || args.has("--live-ai");

const sampleTopic = "как простить человека, если боль не проходит";
const sampleVerse = {
  reference: "Ефесянам 4:32",
  verseText:
    "Будьте друг ко другу добры, сострадательны, прощайте друг друга, как и Бог во Христе простил вас.",
  verseFocus:
    "Прощение рождается из принятой во Христе благодати и ведет к милости без оправдания греха.",
  tags: ["прощение", "обида", "милость", "сердце"],
};

const results = [];

function pass(name, detail) {
  results.push({ status: "PASS", name, detail: detail || "" });
}

function skip(name, detail) {
  results.push({ status: "SKIP", name, detail: detail || "" });
}

async function requestJson(baseUrl, path, options) {
  const controller = new AbortController();
  const timeout = setTimeout(function () {
    controller.abort();
  }, options && options.timeoutMs ? options.timeoutMs : 120000);

  try {
    const response = await fetch(baseUrl + path, Object.assign({}, options || {}, {
      signal: controller.signal,
    }));
    const text = await response.text();
    let payload = null;

    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      payload = { raw: text };
    }

    return { response, payload };
  } finally {
    clearTimeout(timeout);
  }
}

function similarity(left, right) {
  const leftTokens = new Set(String(left || "").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean));
  const rightTokens = new Set(String(right || "").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean));
  const intersection = Array.from(leftTokens).filter(function (token) {
    return rightTokens.has(token);
  }).length;
  const union = new Set(Array.from(leftTokens).concat(Array.from(rightTokens))).size;
  return union ? intersection / union : 0;
}

async function main() {
  const postPrompt = buildPostPrompt({
    topic: sampleTopic,
    reference: sampleVerse.reference,
    verseText: sampleVerse.verseText,
    verseFocus: sampleVerse.verseFocus,
    tags: sampleVerse.tags,
    language: "ru",
    postStyle: "poetic",
    allowEmojis: false,
    variant: 4,
  });

  assert.match(postPrompt, new RegExp(sampleTopic.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(postPrompt, /Style differentiation requirement/u);
  assert.match(postPrompt, /Regeneration variant #4/u);
  pass("post prompt binds topic, style, and regeneration variant");

  const scripturePrompt = buildScriptureSuggestionPrompt({
    topic: sampleTopic,
    language: "ru",
    matchMode: "implicit",
  });

  assert.match(scripturePrompt, /Protestant evangelical sources/u);
  assert.match(scripturePrompt, /topicResearch/u);
  assert.match(scripturePrompt, /Selection mode is implicit/u);
  pass("scripture prompt includes Protestant web research contract and match mode");

  const normalizedScriptures = normalizeSuggestedScriptures({
    topicResearch: {
      summary: "Проверка структурированной ссылки.",
    },
    suggestions: [
      {
        reference: {
          book: "Псалом",
          chapter: 139,
          verse: { start: 1, end: 4 },
        },
        text: {
          text: "Господи, Ты испытал меня и знаешь.",
        },
        tags: ["Божье познание", "уникальность"],
        focus: "Бог знает человека глубже сравнений.",
      },
      {
        reference: { book: "Broken" },
        text: "Эта карточка должна быть отброшена.",
      },
    ],
  }, { language: "ru" });

  assert.equal(normalizedScriptures.suggestions.length, 1);
  assert.equal(normalizedScriptures.suggestions[0].reference, "Псалом 139:1-4");
  assert.doesNotMatch(normalizedScriptures.suggestions[0].reference, /\[object Object\]/u);
  pass("scripture suggestions normalize structured references and reject invalid cards");

  const imagePrompt = buildGeminiPrompt({
    topic: sampleTopic,
    reference: sampleVerse.reference,
    verseText: sampleVerse.verseText,
    verseFocus: sampleVerse.verseFocus,
    tags: sampleVerse.tags,
    language: "ru",
    postStyle: "historical",
    variant: 2,
    posterSettings: {
      format: "story_9_16",
      subject: "city",
      visualStyle: "glitch",
      typography: "oswald",
      layout: "bottom",
      textOpacity: 90,
      strokeStrength: 70,
    },
  });

  assert.match(imagePrompt, /digital glitch-art atmosphere/u);
  assert.match(imagePrompt, /selected subject must dominate/u);
  assert.match(imagePrompt, /not merely add a filter/u);
  assert.match(imagePrompt, /Do not default back to a pastoral landscape/u);
  assert.match(imagePrompt, /wordless background image/u);
  assert.match(imagePrompt, /Negative prompt:/u);
  assert.doesNotMatch(imagePrompt, /Christian social media|Typography support/u);
  pass("image prompt locks subject and visual style beyond filters");

  const pollinationsPrompt = buildPollinationsPrompt({
    topic: sampleTopic,
    reference: sampleVerse.reference,
    verseText: sampleVerse.verseText,
    verseFocus: sampleVerse.verseFocus,
    tags: sampleVerse.tags,
    language: "uk",
    postStyle: "pastoral",
    variant: 5,
    posterSettings: {
      format: "portrait_4_5",
      subject: "meadow",
      visualStyle: "natural",
      layout: "top",
    },
  }, imagePrompt);
  assert.match(pollinationsPrompt, /High-quality atmospheric environmental image/u);
  assert.match(pollinationsPrompt, /Dominant subject: meadow/u);
  assert.match(pollinationsPrompt, /upper half remains a real part of the scene/u);
  assert.match(pollinationsPrompt, /sharp, crisp, clear/u);
  assert.doesNotMatch(pollinationsPrompt, /\b(text|typography|letters?|words?|glyphs?|caption|scripture|verse|reference|logo|watermark|poster|flyer|signage)\b/iu);
  assert.doesNotMatch(pollinationsPrompt, /Base prompt context|Scripture reference mood|Christian social media|Negative prompt:/u);
  pass("pollinations prompt stays visual-only and keeps artifact bans out of the positive prompt");

  const pollinationsQueueError = new Error('Pollinations image API failed HTTP 402: {"x402Version":1,"error":"Queue full for IP: 2a06:98c0:3600::103: 1 requests already queued (max: 1)."}');
  pollinationsQueueError.statusCode = 402;
  const friendlyQueueError = buildImageProvidersUnavailableError([pollinationsQueueError]);
  assert.match(friendlyQueueError.message, /Pollinations уже обрабатывает предыдущий фон/u);
  assert.doesNotMatch(friendlyQueueError.message, /x402Version|accepts|resource|2a06:98c0/u);
  pass("pollinations queue-full errors are user-friendly");

  const server = createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  const baseUrl = "http://127.0.0.1:" + address.port;

  try {
    const statusResult = await requestJson(baseUrl, "/api/status");
    assert.equal(statusResult.response.status, 200);
    assert.equal(statusResult.payload.status, "online");
    pass("/api/status responds");

    const configResult = await requestJson(baseUrl, "/api/config");
    assert.equal(configResult.response.status, 200);
    assert.equal(configResult.payload.version, "1.2.9");
    assert.equal(configResult.payload.provider, "multi");
    assert.equal(typeof configResult.payload.textEnabled, "boolean");
    assert.ok(Array.isArray(configResult.payload.imageProviders));
    assert.equal(typeof configResult.payload.googleSearchEnabled, "boolean");
    assert.equal(configResult.payload.freeModelsOnly, true);
    assert.equal(configResult.payload.aiPolicy.openRouter.modelAllowed, true);
    assert.ok(configResult.payload.aiPolicy.pollinations.configured);
    pass("/api/config exposes version, free-only AI policy, image providers, and search capability flags");

    const imageUsageResult = await requestJson(baseUrl, "/api/image-usage");
    assert.equal(imageUsageResult.response.status, 200);
    assert.equal(imageUsageResult.payload.version, "1.2.9");
    assert.ok(imageUsageResult.payload.imageProviderUsage.providers.gemini);
    assert.ok(imageUsageResult.payload.imageProviderUsage.providers.pollinations);
    pass("/api/image-usage exposes daily image provider archive");

    const desktopResponse = await fetch(baseUrl + "/desktop/");
    assert.equal(desktopResponse.status, 200);
    assert.match(await desktopResponse.text(), /poster-canvas/u);
    pass("/desktop/ serves desktop UI");

    const mobileResponse = await fetch(baseUrl + "/mobile/");
    assert.equal(mobileResponse.status, 200);
    assert.match(await mobileResponse.text(), /poster-canvas/u);
    pass("/mobile/ serves mobile UI");

    if (!process.env.GEMINI_API_KEY) {
      skip("live Gemini API checks", "GEMINI_API_KEY is not set");
    } else if (!runLiveText && !runLiveImage) {
      skip("live Gemini API checks", "run with --live-text, --live-image, or --live-ai");
    }

    let suggestion = null;
    if (process.env.GEMINI_API_KEY && runLiveText) {
      const suggestResult = await requestJson(baseUrl, "/api/suggest-scriptures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: sampleTopic,
          language: "ru",
          matchMode: "explicit",
        }),
      });
      assert.equal(suggestResult.response.status, 200, JSON.stringify(suggestResult.payload));
      assert.ok(Array.isArray(suggestResult.payload.suggestions));
      assert.ok(suggestResult.payload.suggestions.length >= 1);
      const references = suggestResult.payload.suggestions.map(function (item) {
        return item.reference;
      });
      assert.equal(new Set(references).size, references.length);
      suggestion = suggestResult.payload.suggestions[0];
      pass("/api/suggest-scriptures returns non-duplicate AI suggestions");

      const conservativeResult = await requestJson(baseUrl, "/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: sampleTopic,
          reference: suggestion.reference,
          verseText: suggestion.text,
          verseFocus: suggestion.focus,
          selectionReason: "Проверка релизного smoke-test.",
          tags: suggestion.tags,
          language: "ru",
          postStyle: "conservative",
          allowEmojis: false,
          variant: 1,
        }),
      });
      assert.equal(conservativeResult.response.status, 200, JSON.stringify(conservativeResult.payload));
      assert.ok(conservativeResult.payload.post.includes(sampleTopic));
      assert.ok(conservativeResult.payload.post.length < 2000);

      const poeticResult = await requestJson(baseUrl, "/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: sampleTopic,
          reference: suggestion.reference,
          verseText: suggestion.text,
          verseFocus: suggestion.focus,
          selectionReason: "Проверка релизного smoke-test.",
          tags: suggestion.tags,
          language: "ru",
          postStyle: "poetic",
          allowEmojis: false,
          variant: 2,
        }),
      });
      assert.equal(poeticResult.response.status, 200, JSON.stringify(poeticResult.payload));
      assert.ok(poeticResult.payload.post.includes(sampleTopic));
      assert.ok(poeticResult.payload.post.length < 2000);
      assert.notEqual(conservativeResult.payload.post, poeticResult.payload.post);
      assert.ok(similarity(conservativeResult.payload.post, poeticResult.payload.post) < 0.82);
      pass("/api/generate-post changes materially across post styles");
    }

    if (process.env.GEMINI_API_KEY && runLiveImage) {
      const backgroundResult = await requestJson(baseUrl, "/api/generate-background", {
        method: "POST",
        timeoutMs: 180000,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: sampleTopic,
          reference: sampleVerse.reference,
          verseText: sampleVerse.verseText,
          verseFocus: sampleVerse.verseFocus,
          tags: sampleVerse.tags,
          postText: sampleTopic + "\n\nПроверка генерации фона.",
          language: "ru",
          postStyle: "historical",
          variant: 3,
          posterSettings: {
            format: "portrait_4_5",
            subject: "city",
            visualStyle: "glitch",
            typography: "oswald",
            layout: "center",
            textOpacity: 92,
            strokeStrength: 70,
          },
        }),
      });
      assert.equal(backgroundResult.response.status, 200, JSON.stringify(backgroundResult.payload));
      assert.match(backgroundResult.payload.imageDataUrl, /^data:image\//u);
      assert.notEqual(backgroundResult.payload.provider, "local-fallback", JSON.stringify({
        provider: backgroundResult.payload.provider,
        model: backgroundResult.payload.model,
        mimeType: backgroundResult.payload.mimeType,
        warning: backgroundResult.payload.warning,
      }));
      assert.match(backgroundResult.payload.model, /gemini|pollinations|cloudflare|huggingface|qwen/u);
      assert.match(backgroundResult.payload.prompt, /glitch-art/u);
      assert.match(backgroundResult.payload.prompt, /city/u);
      pass("/api/generate-background returns an image and preserves selected visual style");
    }
  } finally {
    server.close();
    await once(server, "close");
  }

  results.forEach(function (result) {
    const detail = result.detail ? " - " + result.detail : "";
    console.log(result.status + " " + result.name + detail);
  });
}

main().catch(function (error) {
  results.forEach(function (result) {
    const detail = result.detail ? " - " + result.detail : "";
    console.log(result.status + " " + result.name + detail);
  });
  console.error("FAIL " + (error && error.stack ? error.stack : error));
  process.exitCode = 1;
});
