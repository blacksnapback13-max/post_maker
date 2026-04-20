"use strict";

const fs = require("node:fs");
const vm = require("node:vm");

const APP_URL = "http://127.0.0.1:3001";
const APP_JS_PATH = "app.js";
const INDEX_HTML_PATH = "index.html";

const languageSamples = {
  ru: {
    topic: "как не строить свою ценность на лайках и чужом одобрении",
    sourceLanguage: "ru",
    targetLanguage: "uk",
    translatedTopicFragment: "лай",
    verse: {
      reference: "Иакова 1:19",
      text: "Всякий человек да будет скор на слышание, медлен на слова, медлен на гнев.",
      focus: "Писание зовет к внимательному слушанию, внутренней собранности и зрелой реакции вместо мгновенного раздражения.",
      tags: ["общение", "слушание", "мир"],
    },
  },
  uk: {
    topic: "як не будувати свою цінність на лайках і чужому схваленні",
    sourceLanguage: "uk",
    targetLanguage: "pl",
    translatedTopicFragment: "laj",
    verse: {
      reference: "Якова 1:19",
      text: "Кожна людина нехай буде скорою на слухання, повільною на слова, повільною на гнів.",
      focus: "Писання закликає не жити реакціями, а вчитися слухати, мислити і відповідати з мудрістю.",
      tags: ["спілкування", "слухання", "мир"],
    },
  },
  pl: {
    topic: "jak nie budować swojej wartości na lajkach i cudzej aprobacie",
    sourceLanguage: "pl",
    targetLanguage: "ru",
    translatedTopicFragment: "лай",
    verse: {
      reference: "Jakuba 1:19",
      text: "Każdy człowiek niech będzie skory do słuchania, nieskory do mówienia, nieskory do gniewu.",
      focus: "Pismo uczy powściągliwości, słuchania i dojrzałej reakcji zamiast natychmiastowego wybuchu.",
      tags: ["komunikacja", "słuchanie", "pokój"],
    },
  },
};

const styleByLanguage = {
  ru: "inspiring",
  uk: "pastoral",
  pl: "modern",
};

function extractObjectAssignment(source, assignmentText, nextMarker) {
  const start = source.indexOf(assignmentText);
  const end = source.indexOf(nextMarker);

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Could not locate source block: " + assignmentText);
  }

  return source.slice(start, end).replace(assignmentText, assignmentText.split(" ")[1] + " =");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function summarizePass(name, details) {
  return { name, ok: true, details };
}

function summarizeFail(name, error) {
  return { name, ok: false, details: error instanceof Error ? error.message : String(error) };
}

async function runCheck(name, fn) {
  try {
    const details = await fn();
    return summarizePass(name, details);
  } catch (error) {
    return summarizeFail(name, error);
  }
}

async function fetchJson(pathname, options) {
  const requestOptions = Object.assign({}, options || {});
  requestOptions.signal =
    requestOptions.signal || (AbortSignal && typeof AbortSignal.timeout === "function"
      ? AbortSignal.timeout(30000)
      : undefined);

  const response = await fetch(APP_URL + pathname, requestOptions);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(pathname + " -> " + response.status + ": " + (payload.error || "Unknown error"));
  }

  return payload;
}

function loadUiStrings(source) {
  const block = extractObjectAssignment(source, "const uiStrings =", "const state =");
  const sandbox = { uiStrings: null };
  vm.createContext(sandbox);
  vm.runInContext(block, sandbox);
  return sandbox.uiStrings;
}

function runStaticAudit() {
  const html = fs.readFileSync(INDEX_HTML_PATH, "utf8");
  const appJs = fs.readFileSync(APP_JS_PATH, "utf8");
  const uiStrings = loadUiStrings(appJs);

  const htmlIds = [...html.matchAll(/id=\"([^\"]+)\"/g)].map(function (match) {
    return match[1];
  });
  const queriedIds = [...appJs.matchAll(/getElementById\(\"([^\"]+)\"\)/g)].map(function (match) {
    return match[1];
  });
  const missingIds = [...new Set(queriedIds.filter(function (id) {
    return !htmlIds.includes(id);
  }))];

  assert(!missingIds.length, "Missing IDs in HTML: " + missingIds.join(", "));

  const translationKeysByLang = Object.fromEntries(
    Object.entries(uiStrings).map(function (entry) {
      return [entry[0], Object.keys(entry[1]).sort()];
    })
  );
  const allKeys = [...new Set(Object.values(translationKeysByLang).flat())].sort();

  Object.entries(translationKeysByLang).forEach(function (entry) {
    const missingKeys = allKeys.filter(function (key) {
      return !entry[1].includes(key);
    });
    assert(!missingKeys.length, "Missing UI keys for " + entry[0] + ": " + missingKeys.join(", "));
  });

  const libraryBlock = appJs.slice(
    appJs.indexOf("const scriptureLibrary ="),
    appJs.indexOf("const scriptureTranslations =")
  );
  const translationsBlock = appJs.slice(
    appJs.indexOf("const scriptureTranslations ="),
    appJs.indexOf("const tagTranslations =")
  );
  const verseIds = [...libraryBlock.matchAll(/id:\s*\"([^\"]+)\"/g)].map(function (match) {
    return match[1];
  });
  const translatedVerseIds = [...translationsBlock.matchAll(/\"([^\"]+)\":\s*\{\s*uk:/g)].map(function (match) {
    return match[1];
  });
  const missingVerseTranslations = verseIds.filter(function (id) {
    return !translatedVerseIds.includes(id);
  });

  assert(
    !missingVerseTranslations.length,
    "Missing scripture translations: " + missingVerseTranslations.join(", ")
  );

  return {
    htmlIds: htmlIds.length,
    queriedIds: queriedIds.length,
    uiKeys: allKeys.length,
    verseTranslations: verseIds.length,
  };
}

async function runApiAudit() {
  const results = [];

  results.push(
    await runCheck("config", async function () {
      const payload = await fetchJson("/api/config");
      assert(payload.available === true, "Server should be available");
      assert(payload.imageEnabled === true, "Gemini should be enabled");
      return payload;
    })
  );

  for (const language of Object.keys(languageSamples)) {
    const sample = languageSamples[language];

    results.push(
      await runCheck("translate-topic:" + language, async function () {
        const payload = await fetchJson("/api/translate-topic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: sample.topic,
            sourceLanguage: sample.sourceLanguage,
            targetLanguage: sample.targetLanguage,
          }),
        });

        assert(payload.topic && payload.topic.trim().length > 8, "Translated topic is too short");
        return { topic: payload.topic };
      })
    );

    results.push(
      await runCheck("suggest-scriptures:" + language, async function () {
        const payload = await fetchJson("/api/suggest-scriptures", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: sample.topic,
            language,
            matchMode: "implicit",
            library: [
              {
                id: "james-1-19",
                reference: sample.verse.reference,
                text: sample.verse.text,
                tags: sample.verse.tags,
              },
              {
                id: "prov-4-23",
                reference:
                  language === "uk"
                    ? "Приповісті 4:23"
                    : language === "pl"
                      ? "Przysłów 4:23"
                      : "Притчи 4:23",
                text:
                  language === "uk"
                    ? "Над усе, що лише стережеться, серце своє стережи, бо з нього походить життя."
                    : language === "pl"
                      ? "Czujniej niż wszystkiego innego strzeż swego serca, bo z niego tryska życie."
                      : "Больше всего хранимого храни сердце твое, потому что из него источники жизни.",
                tags:
                  language === "uk"
                    ? ["серце", "цінність", "схвалення"]
                    : language === "pl"
                      ? ["serce", "wartość", "aprobata"]
                      : ["сердце", "ценность", "одобрение"],
              },
            ],
          }),
        });

        assert(Array.isArray(payload.ids) && payload.ids.length > 0, "No scripture suggestions returned");
        return { ids: payload.ids, reasons: payload.reasons };
      })
    );

    for (const style of [styleByLanguage[language]]) {
      results.push(
        await runCheck("generate-post:" + language + ":" + style, async function () {
          const payload = await fetchJson("/api/generate-post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              topic: sample.topic,
              reference: sample.verse.reference,
              verseText: sample.verse.text,
              verseFocus: sample.verse.focus,
              selectionReason: "Подходит по теме внутренней ценности, сердца и реакции на внешнее одобрение.",
              tags: sample.verse.tags,
              language,
              postStyle: style,
              allowEmojis: style === "inspiring",
              variant: style.length,
            }),
          });

          const post = String(payload.post || "");
          const paragraphs = post.split(/\n+/u).map(function (line) {
            return line.trim();
          }).filter(Boolean);
          const hashtagLine = paragraphs[paragraphs.length - 1] || "";
          const hashtags = hashtagLine.match(/#[^\s#]+/gu) || [];

          assert(post.startsWith(sample.topic), "Post does not start with the selected topic");
          assert(post.length <= 2000, "Post is longer than 2000 characters");
          assert(hashtags.length === 5, "Post should end with exactly 5 hashtags");
          assert(
            payload.reference === sample.verse.reference,
            "Reference changed unexpectedly: " + payload.reference
          );

          return {
            length: post.length,
            hashtags,
            preview: post.slice(0, 160),
          };
        })
      );
    }
  }

  for (const language of ["ru"]) {
    const sample = languageSamples[language];
    results.push(
      await runCheck("generate-background:" + language, async function () {
        const payload = await fetchJson("/api/generate-background", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: sample.topic,
            reference: sample.verse.reference,
            verseText: sample.verse.text,
            verseFocus: sample.verse.focus,
            tags: sample.verse.tags,
            postText: sample.topic + "\n\n" + sample.verse.text,
            variant: language.charCodeAt(0),
            language,
            postStyle: "inspiring",
            posterSettings: {
              subject: language === "pl" ? "city" : "landscape",
              visualStyle: language === "uk" ? "dreamy" : "natural",
              typography: "noto_serif",
              layout: language === "ru" ? "top" : language === "uk" ? "center" : "bottom",
              textOpacity: 92,
              strokeStrength: 68,
              logoPosition: "bottom_right",
              logoSize: 14,
              logoOpacity: 100,
            },
          }),
        });

        assert(
          typeof payload.imageDataUrl === "string" && payload.imageDataUrl.startsWith("data:image/"),
          "Background image was not returned"
        );
        return {
          model: payload.model,
          promptPreview: String(payload.prompt || "").slice(0, 140),
        };
      })
    );
  }

  return results;
}

async function main() {
  const summary = {
    staticAudit: runStaticAudit(),
    apiAudit: await runApiAudit(),
  };

  const failed = summary.apiAudit.filter(function (result) {
    return !result.ok;
  });

  console.log(JSON.stringify(summary, null, 2));

  if (failed.length) {
    process.exitCode = 1;
  }
}

main().catch(function (error) {
  console.error(error);
  process.exitCode = 1;
});
