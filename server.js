"use strict";

const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const { URL } = require("node:url");

const APP_ROOT = __dirname;
const MOBILE_ROOT = path.join(APP_ROOT, "Мобильная версия");
const ENV_PATH = path.join(APP_ROOT, ".env");
const VIEW_COOKIE_NAME = "postmaker_view";
const DESKTOP_VIEW = "desktop";
const MOBILE_VIEW = "mobile";
const DESKTOP_BASE_PATH = "/desktop";
const MOBILE_BASE_PATH = "/mobile";

loadEnvFile(ENV_PATH);

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const DEFAULT_IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image-preview";
const DEFAULT_TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const moodProfiles = [
  {
    id: "purity",
    matches: ["чистота", "до брака", "границы", "святость", "воздержание"],
    scenes: [
      "a quiet lake at sunrise with transparent air and gentle morning mist",
      "a calm sea shore before sunrise with pale pastel light",
      "a dew-covered meadow with soft dawn light and spacious horizon",
    ],
    lightings: ["clear early morning light", "soft pearly dawn glow", "subtle diffused sunrise"],
    palettes: ["pale blue, warm cream, soft sage", "pearl white, muted gold, light teal"],
    moods: ["pure", "reverent", "peaceful", "restrained", "clean"],
  },
  {
    id: "marriage",
    matches: ["брак", "семья", "муж", "жена", "завет"],
    scenes: [
      "a warm valley landscape in golden sunrise light",
      "a peaceful meadow with long grass and warm morning sun",
      "a serene coastal cliff view with hopeful sunlight",
    ],
    lightings: ["warm golden sunrise", "gentle sun after dawn", "soft hopeful daylight"],
    palettes: ["honey gold, sand, olive green", "warm beige, muted amber, soft green"],
    moods: ["warm", "stable", "hopeful", "faithful", "gentle"],
  },
  {
    id: "communication",
    matches: ["общение", "прощение", "обида", "конфликт", "мир", "слушание"],
    scenes: [
      "a still mountain lake with layered mist and calm reflective water",
      "a quiet forest path with soft blue morning haze",
      "a gentle river landscape with calm overcast light and atmospheric depth",
    ],
    lightings: ["soft blue morning light", "delicate cloudy glow", "quiet post-rain light"],
    palettes: ["dusty blue, mist gray, soft green", "cool blue, warm cream, muted pine"],
    moods: ["restoring", "tender", "quiet", "merciful", "reflective"],
  },
  {
    id: "trust",
    matches: ["доверие", "выбор", "воля бож", "решение", "ожидание", "мудрость"],
    scenes: [
      "a mountain overlook with open sky and long-distance view",
      "a wide sea horizon with soft clouds and calm water",
      "a peaceful valley with layered hills fading into light",
    ],
    lightings: ["clear uplifting daylight", "open bright horizon light", "gentle radiant morning light"],
    palettes: ["sky blue, ivory, muted sage", "soft turquoise, warm sand, gray-blue"],
    moods: ["open", "clear", "hopeful", "steady", "trusting"],
  },
  {
    id: "love",
    matches: ["любовь", "нежность", "сердце", "служение", "единство"],
    scenes: [
      "a calm beach at golden hour with soft rolling waves",
      "a peaceful meadow in late afternoon light with warm breeze",
      "a quiet forest clearing with warm sun rays through trees",
    ],
    lightings: ["golden hour light", "warm soft sunset glow", "gentle radiant afternoon sun"],
    palettes: ["warm peach, light gold, muted green", "soft amber, cream, dusty rose"],
    moods: ["tender", "warm", "graceful", "gentle", "safe"],
  },
];

const variationPool = [
  "emphasize open negative space in the center",
  "make the horizon a little higher and the foreground softer",
  "use slightly more atmospheric haze and depth",
  "lean into a more cinematic but still realistic composition",
  "make the composition more minimal and editorial",
  "add a delicate sense of fresh air after rain",
];

const compositionPool = [
  "portrait 4:5 composition with generous quiet space in the center for typography",
  "editorial poster layout with soft central negative space and calm visual rhythm",
  "balanced landscape composition that leaves the main center area uncluttered for text overlay",
];

const languageMeta = {
  ru: { name: "Russian", fallbackHashtags: ["#вера", "#евангелие", "#библия", "#христианство", "#надежда"] },
  uk: { name: "Ukrainian", fallbackHashtags: ["#віра", "#євангеліє", "#біблія", "#християнство", "#надія"] },
  pl: { name: "Polish", fallbackHashtags: ["#wiara", "#ewangelia", "#biblia", "#chrześcijaństwo", "#nadzieja"] },
  tr: { name: "Turkish", fallbackHashtags: ["#iman", "#müjde", "#kutsalkitap", "#hristiyanlık", "#umut"] },
};

const postStyleGuides = {
  soft:
    "gentle, warm, pastoral, careful with hurting hearts, inviting trust and prayer without sentimentality",
  inspiring:
    "hopeful, motivating, faith-stirring, encouraging practical response and renewed trust in God",
  conservative:
    "measured, doctrinally careful, reverent, sober, Scripture-first, avoiding trendy language",
  modern:
    "clear, fresh, accessible, contemporary without slang, concise but spiritually weighty",
  historical:
    "echoing historic Protestant preaching language with warmth, gravitas, and a sense of continuity with the church",
  pastoral:
    "shepherding, comforting, wise, attentive to conscience, steadying the reader toward Christ and obedience",
  evangelistic:
    "clear gospel invitation, urgent but not manipulative, calling the reader to repentance, faith, and surrender to Christ",
  meditative:
    "quiet, reflective, prayerful, slow and contemplative while remaining biblically exact",
  poetic:
    "lyrical and image-rich, elegant and memorable, but still sober, doctrinally safe, and Scripture-led",
};

const storytellingGuides = {
  soft:
    "begin with a tender, recognizable human ache; move gently into the verse; end with a warm but clear invitation to obey Christ",
  inspiring:
    "open with a vivid tension or longing people recognize; let the verse answer it; end with energizing hope and a concrete next step",
  conservative:
    "start with a sober real-life spiritual problem; anchor it quickly in the text; build toward orderly repentance and faithful obedience",
  modern:
    "use crisp contemporary phrasing and a relatable real-life pressure point; pivot quickly to Scripture; close with a practical response",
  historical:
    "sound like a brief classic sermon turn: human condition, biblical light, Christ-centered doctrine, earnest appeal to conscience",
  pastoral:
    "name the burden people quietly carry; let the verse shepherd the conscience; end with guidance, prayer, and gentle action",
  evangelistic:
    "surface the heart issue behind the topic; move from exposure of sin or need to Christ's call; end with urgent but honest repentance and faith",
  meditative:
    "begin with stillness and inner tension; unfold the verse slowly; end with prayerful self-examination and a quiet step of obedience",
  poetic:
    "open with an image or emotional scene that feels true to ordinary life; weave the verse through it; close with memorable, worshipful resolve",
};

const topicLensGuides = [
  {
    matches: ["до брака", "до шлюбу", "przed ślub", "evlilikten önce", "relacj", "ilişk", "стосунк", "отношен"],
    guidance:
      "Address motives, boundaries, emotional honesty, patience, chastity, and whether the relationship is moving toward covenantal faithfulness instead of self-centered desire.",
  },
  {
    matches: ["брак", "шлюб", "małżeń", "evlilik", "семья", "родин", "aile"],
    guidance:
      "Emphasize covenant, sacrificial love, mutual responsibility, prayer, and the home being built under the lordship of Christ rather than on feelings alone.",
  },
  {
    matches: ["чистот", "czysto", "paklık", "temizlik", "святост", "święto", "kutsal", "грех", "гріх", "grzech", "günah"],
    guidance:
      "Stress holiness, repentance, self-control, grace for obedience, and the goodness of purity as protection for joy, peace, and clear conscience before God.",
  },
  {
    matches: ["конфликт", "конфлікт", "konflikt", "çatış", "обид", "образ", "incin", "прощ", "пробач", "przebacz", "bağış", "affet"],
    guidance:
      "Highlight repentance, forgiveness, careful speech, patient listening, and peace-making rooted in the mercy believers themselves have received in Christ.",
  },
  {
    matches: ["выбор", "wybór", "wybor", "seçim", "довер", "довір", "zauf", "güven", "воля бож", "wola boża", "tanrı'nın isteği", "tanrının isteği"],
    guidance:
      "Call for trusting God's wisdom above impulse, bringing decisions to Scripture and prayer, and seeking peace that flows from submission to the Lord.",
  },
];

const posterSubjectGuides = {
  landscape: [
    "a peaceful wide landscape with natural depth and uncluttered center",
    "an open scenic horizon with quiet atmosphere and room for text",
    "a serene panoramic nature setting with calm balance",
  ],
  sea: [
    "a calm sea coast with spacious sky and gentle waves",
    "a tranquil ocean horizon with soft motion and open air",
    "a peaceful shoreline with elegant light and negative space",
  ],
  forest: [
    "a quiet forest path with airy light and subtle depth",
    "a peaceful woodland clearing with soft atmosphere",
    "a serene forest scene with gentle light between trees",
  ],
  mountains: [
    "a mountain overlook with open space and contemplative distance",
    "a layered mountain valley with clean air and calm grandeur",
    "a peaceful alpine scene with structured depth and soft light",
  ],
  meadow: [
    "a sunlit meadow with soft grass, quiet movement, and open composition",
    "a calm field landscape with warm air and uncluttered center",
    "a gentle meadow horizon with elegant natural softness",
  ],
  sunrise: [
    "a quiet sunrise scene with luminous horizon and calm atmosphere",
    "a dawn landscape with hopeful light and soft pastel air",
    "an early morning horizon with subtle glow and spacious center",
  ],
  sunset: [
    "a calm sunset horizon with layered warm light and open sky",
    "a peaceful dusk landscape with glowing clouds and soft atmosphere",
  ],
  sky: [
    "a spacious sky with elegant cloud formations and open breathing room",
    "a soft atmospheric cloudscape with minimal lower detail and clear text space",
  ],
  lake: [
    "a still lake with reflective water and quiet morning light",
    "a peaceful lake shore with soft mist and gentle open composition",
  ],
  river: [
    "a calm river scene with flowing water and contemplative depth",
    "a serene riverside landscape with soft natural rhythm and uncluttered center",
  ],
  desert: [
    "a refined desert landscape with wind-shaped dunes and quiet light",
    "a spacious desert horizon with soft sand tones and peaceful stillness",
  ],
  flowers: [
    "a delicate floral landscape with airy blossoms and elegant negative space",
    "a peaceful garden scene with soft flowers, light haze, and refined balance",
  ],
  rain: [
    "a rain-washed scene with soft reflections, mist, and calm atmosphere",
    "a gentle fog-and-rain landscape with poetic depth and subdued motion",
  ],
  city: [
    "a calm modern city skyline with atmospheric light and clean open space for typography",
    "an elegant urban horizon with soft haze, reflective surfaces, and uncluttered central space",
  ],
  old_town: [
    "a peaceful old town street with timeless architecture and gentle light",
    "a historic city view with warm stone tones, calm atmosphere, and open composition",
  ],
  street: [
    "a quiet city street with soft evening light, shallow detail, and room for text",
    "an atmospheric street scene with refined perspective and restrained visual clutter",
  ],
  architecture: [
    "a minimalist architectural scene with clean lines, symmetry, and premium calm",
    "an elegant building composition with geometric order and open negative space",
  ],
  interior: [
    "a serene interior with soft natural light, clean surfaces, and contemplative mood",
    "a calm room scene with warm textures and generous uncluttered space for typography",
  ],
  people: [
    "a tasteful scene with one or two anonymous people in a calm environment, small in frame, elegant and reverent",
    "an atmospheric human-centered scene with distant figures, soft light, and clear empty space for text",
  ],
  couple: [
    "a tasteful scene with an anonymous couple seen from afar, gentle posture, and peaceful atmosphere",
    "a reverent silhouette-like couple scene with elegant light and uncluttered composition",
  ],
  journey: [
    "a road or pathway scene suggesting pilgrimage, direction, and hope",
    "a quiet travel landscape with a road, distant horizon, and reflective mood",
  ],
  night: [
    "a calm night scene with soft city or landscape lights and readable dark negative space",
    "a moonlit or evening atmosphere with restrained glow and contemplative stillness",
  ],
  abstract: [
    "an abstract atmospheric composition with light, gradients, and spiritual calm",
    "a non-literal visual field of luminous shapes and soft depth suitable for typography",
  ],
  texture: [
    "a refined texture-based background with light, grain, paper, and subtle motion",
    "an elegant abstract texture with soft layering and premium poster feeling",
  ],
};

const posterVisualStyleGuides = {
  natural:
    "true-to-life photography, natural lens perspective, believable materials, soft documentary atmosphere, no surreal effects",
  editorial:
    "premium magazine editorial photography, deliberate art direction, refined styling, polished layout-like negative space",
  cinematic:
    "cinematic film still, dramatic depth, motivated light, anamorphic atmosphere, strong foreground-background separation",
  minimalist:
    "minimalist art direction, large quiet surfaces, reduced objects, restrained palette, strong negative space and calm geometry",
  painterly:
    "fine-art painting language, visible brush texture, layered color transitions, handcrafted atmosphere, not photorealistic",
  vintage_film:
    "1970s analog film photography, soft grain, faded contrast, imperfect exposure, nostalgic lens character",
  dreamy:
    "ethereal dreamlike scene, luminous haze, soft-focus glow, delicate highlights, gentle surreal atmosphere",
  modernism:
    "modernist design composition, Bauhaus-like geometry, clean planes, disciplined grid, reduced color and architectural rhythm",
  postmodern:
    "postmodern art composition, playful layered shapes, unexpected scale shifts, collage-like spatial tension, expressive but balanced",
  glitch:
    "digital glitch-art atmosphere, fractured light planes, chromatic displacement, subtle scanline artifacts, experimental tech texture",
  luxury:
    "luxury editorial aesthetic, premium materials, controlled highlights, refined contrast, elegant high-end visual restraint",
  analog:
    "tactile analog process, handmade paper grain, slight imperfections, organic texture, human-crafted visual character",
};

const posterFormatGuides = {
  portrait_4_5:
    "vertical 4:5 Instagram feed format, 1080 by 1350 composition, poster-like portrait crop",
  story_9_16:
    "vertical 9:16 Stories/Reels format, 1080 by 1920 composition, tall cinematic crop with strong vertical breathing room",
  square_1_1:
    "square 1:1 Instagram format, 1080 by 1080 composition, balanced centered crop with calm margins",
  landscape_16_9:
    "wide 16:9 format, 1920 by 1080 composition, horizontal cinematic crop with text-safe central area",
};

const layoutGuides = {
  top: "leave the upper half especially readable and calm for typography, while keeping detail lower in the scene",
  center: "leave the center area especially calm and uncluttered for typography",
  bottom: "leave the lower half especially readable and uncluttered for typography, with more visual detail higher up",
};

function createServer() {
  return http.createServer(async function (request, response) {
    try {
      const requestUrl = new URL(request.url || "/", "http://localhost");

      if (request.method === "GET" && requestUrl.pathname === "/api/config") {
        return sendJson(response, 200, {
          available: true,
          imageEnabled: Boolean(process.env.GEMINI_API_KEY),
          model: getImageModel(),
          textModel: getTextModel(),
          provider: "gemini",
        });
      }

      if (request.method === "POST" && requestUrl.pathname === "/api/generate-post") {
        const body = await readJsonBody(request);

        if (!process.env.GEMINI_API_KEY) {
          return sendJson(response, 503, {
            error: "GEMINI_API_KEY не задан. Добавьте его в .env и перезапустите сервер.",
          });
        }

        const prompt = buildPostPrompt(body);
        const generated = await requestGeminiJson(prompt, getTextModel());
        const normalized = normalizeGeneratedPost(generated, body);

        return sendJson(response, 200, {
          provider: "gemini",
          model: getTextModel(),
          prompt: prompt,
          post: normalized.post,
          hashtags: normalized.hashtags,
          verseText: normalized.verseText,
          reference: normalized.reference,
        });
      }

      if (request.method === "POST" && requestUrl.pathname === "/api/suggest-scriptures") {
        const body = await readJsonBody(request);

        if (!process.env.GEMINI_API_KEY) {
          return sendJson(response, 503, {
            error: "GEMINI_API_KEY не задан. Добавьте его в .env и перезапустите сервер.",
          });
        }

        const prompt = buildScriptureSuggestionPrompt(body);
        const generated = await requestGeminiJson(prompt, getTextModel());
        const normalized = normalizeSuggestedScriptures(generated, body.library);

        return sendJson(response, 200, {
          provider: "gemini",
          model: getTextModel(),
          prompt: prompt,
          ids: normalized.ids,
          reasons: normalized.reasons,
        });
      }

      if (request.method === "POST" && requestUrl.pathname === "/api/translate-topic") {
        const body = await readJsonBody(request);

        if (!process.env.GEMINI_API_KEY) {
          return sendJson(response, 503, {
            error: "GEMINI_API_KEY не задан. Добавьте его в .env и перезапустите сервер.",
          });
        }

        const prompt = buildTopicTranslationPrompt(body);
        const generated = await requestGeminiJson(prompt, getTextModel(), { temperature: 0.2 });
        const normalized = normalizeTranslatedTopic(generated, body);

        return sendJson(response, 200, {
          provider: "gemini",
          model: getTextModel(),
          prompt: prompt,
          topic: normalized.topic,
        });
      }

      if (request.method === "POST" && requestUrl.pathname === "/api/generate-background") {
        const body = await readJsonBody(request);

        if (!process.env.GEMINI_API_KEY) {
          return sendJson(response, 503, {
            error: "GEMINI_API_KEY не задан. Добавьте его в .env и перезапустите сервер.",
          });
        }

        const referenceImage = normalizeReferenceImagePayload(body.referenceImage);
        const prompt = buildGeminiPrompt(Object.assign({}, body, { referenceImage: referenceImage }));
        const model = getImageModel();
        const image = await requestGeminiImage(prompt, model, referenceImage);

        return sendJson(response, 200, {
          provider: "gemini",
          model: model,
          prompt: prompt,
          imageDataUrl: image.dataUrl,
          mimeType: image.mimeType,
        });
      }

      if (request.method === "GET") {
        return handleGetRequest(request, requestUrl, response);
      }

      sendJson(response, 405, { error: "Метод не поддерживается." });
    } catch (error) {
      const statusCode = error && error.statusCode ? error.statusCode : 500;
      sendJson(response, statusCode, { error: error.message || "Внутренняя ошибка сервера." });
    }
  });
}

function handleGetRequest(request, requestUrl, response) {
  const overrideView = isEntryRoute(requestUrl.pathname)
    ? normalizeViewName(requestUrl.searchParams.get("view"))
    : "";

  if (overrideView) {
    return redirectToView(response, overrideView, "/", requestUrl.searchParams);
  }

  if (requestUrl.pathname === "/") {
    return redirectToView(response, getPreferredView(request), "/", requestUrl.searchParams);
  }

  if (requestUrl.pathname === "/favicon.ico") {
    return sendStaticAssetFromRoot("/assets/shtunda13-postmaker-icon.png", response, APP_ROOT);
  }

  if (requestUrl.pathname === DESKTOP_BASE_PATH) {
    return redirectToView(response, DESKTOP_VIEW, "/", requestUrl.searchParams);
  }

  if (requestUrl.pathname === MOBILE_BASE_PATH) {
    return redirectToView(response, MOBILE_VIEW, "/", requestUrl.searchParams);
  }

  if (requestUrl.pathname === DESKTOP_BASE_PATH + "/" || requestUrl.pathname === DESKTOP_BASE_PATH + "/index.html") {
    return sendStaticAssetFromRoot("/index.html", response, APP_ROOT, {
      "Set-Cookie": serializeViewCookie(DESKTOP_VIEW),
    });
  }

  if (requestUrl.pathname === MOBILE_BASE_PATH + "/" || requestUrl.pathname === MOBILE_BASE_PATH + "/index.html") {
    return sendStaticAssetFromRoot("/index.html", response, MOBILE_ROOT, {
      "Set-Cookie": serializeViewCookie(MOBILE_VIEW),
    });
  }

  if (requestUrl.pathname.startsWith(DESKTOP_BASE_PATH + "/")) {
    return sendStaticAssetFromRoot(
      requestUrl.pathname.slice(DESKTOP_BASE_PATH.length),
      response,
      APP_ROOT
    );
  }

  if (requestUrl.pathname.startsWith(MOBILE_BASE_PATH + "/")) {
    return sendStaticAssetFromRoot(
      requestUrl.pathname.slice(MOBILE_BASE_PATH.length),
      response,
      MOBILE_ROOT
    );
  }

  return sendStaticAssetFromRoot(requestUrl.pathname, response, APP_ROOT);
}

async function requestGeminiJson(prompt, model, options) {
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    encodeURIComponent(model) +
    ":generateContent";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature:
          options && Number.isFinite(Number(options.temperature))
            ? Number(options.temperature)
            : 0.95,
      },
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    const message =
      (payload && payload.error && payload.error.message) ||
      "Gemini API не смогла сгенерировать текст.";
    const error = new Error(message);
    error.statusCode = response.status;
    throw error;
  }

  const rawText = extractTextPayload(payload);
  if (!rawText) {
    throw new Error("AI-модель не вернула текст для поста.");
  }

  try {
    return JSON.parse(rawText);
  } catch {
    const jsonMatch = rawText.match(/\{[\s\S]*\}/u);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("AI-модель вернула текст в неожиданном формате.");
  }
}

async function requestGeminiImage(prompt, model, referenceImage) {
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    encodeURIComponent(model) +
    ":generateContent";

  const imageConfig = { aspectRatio: "4:5" };
  if (model !== "gemini-2.5-flash-image") {
    imageConfig.imageSize = "2K";
  }

  const parts = [];
  if (referenceImage) {
    parts.push({
      inlineData: {
        mimeType: referenceImage.mimeType,
        data: referenceImage.data,
      },
    });
  }
  parts.push({ text: prompt });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: parts,
        },
      ],
      generationConfig: {
        imageConfig: imageConfig,
      },
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    const message =
      (payload && payload.error && payload.error.message) ||
      "Gemini API не смогла сгенерировать изображение.";
    const error = new Error(message);
    error.statusCode = response.status;
    throw error;
  }

  const inline = extractInlineImage(payload);
  if (!inline) {
    throw new Error("AI-модель не вернула изображение. Попробуйте еще раз.");
  }

  return {
    mimeType: inline.mimeType || "image/png",
    dataUrl: "data:" + (inline.mimeType || "image/png") + ";base64," + inline.data,
  };
}

function normalizeReferenceImagePayload(referenceImage) {
  if (!referenceImage || typeof referenceImage !== "object") {
    return null;
  }

  const mimeType = String(referenceImage.mimeType || "")
    .trim()
    .toLowerCase();
  const data = String(referenceImage.data || "").replace(/\s+/g, "");

  if (!mimeType.startsWith("image/")) {
    const error = new Error("Референс должен быть изображением.");
    error.statusCode = 400;
    throw error;
  }

  if (!/^[A-Za-z0-9+/=]+$/u.test(data)) {
    const error = new Error("Референс передан в неверном формате.");
    error.statusCode = 400;
    throw error;
  }

  if (data.length > 14_000_000) {
    const error = new Error("Референс слишком большой. Выберите файл поменьше.");
    error.statusCode = 413;
    throw error;
  }

  return {
    mimeType: mimeType,
    data: data,
  };
}

function extractInlineImage(payload) {
  const candidates = Array.isArray(payload && payload.candidates) ? payload.candidates : [];

  for (const candidate of candidates) {
    const content = candidate && candidate.content ? candidate.content : {};
    const parts = Array.isArray(content.parts) ? content.parts : [];

    for (const part of parts) {
      const inline = part.inlineData || part.inline_data;
      if (inline && inline.data) {
        return inline;
      }
    }
  }

  return null;
}

function extractTextPayload(payload) {
  const candidates = Array.isArray(payload && payload.candidates) ? payload.candidates : [];

  for (const candidate of candidates) {
    const content = candidate && candidate.content ? candidate.content : {};
    const parts = Array.isArray(content.parts) ? content.parts : [];
    const text = parts
      .map(function (part) {
        return typeof part.text === "string" ? part.text : "";
      })
      .join("")
      .trim();

    if (text) {
      return text;
    }
  }

  return "";
}

function buildGeminiPrompt(input) {
  const topic = cleanText(input.topic);
  const reference = cleanText(input.reference);
  const verseText = cleanText(input.verseText);
  const verseFocus = cleanText(input.verseFocus);
  const postText = cleanText(input.postText);
  const tags = Array.isArray(input.tags) ? input.tags.map(cleanText).filter(Boolean) : [];
  const language = resolveLanguage(input.language);
  const postStyle = String(input.postStyle || "inspiring");
  const settings = input.posterSettings || {};
  const variant = Number.isFinite(Number(input.variant)) ? Number(input.variant) : 0;
  const profile = selectMoodProfile(topic, verseFocus, tags);
  const subject = String(settings.subject || "landscape");
  const visualStyleId = String(settings.visualStyle || "natural");
  const formatId = String(settings.format || "portrait_4_5");
  const seed = hashString(
    [
      topic,
      reference,
      verseText,
      verseFocus,
      tags.join(" "),
      subject,
      visualStyleId,
      formatId,
      String(variant),
    ].join("|")
  );
  const scene = pickSubjectScene(subject, profile, seed + 11);
  const lighting = pickBySeed(profile.lightings, seed + 19);
  const palette = pickBySeed(profile.palettes, seed + 29);
  const mood = profile.moods.join(", ");
  const composition = pickBySeed(compositionPool, seed + 37);
  const variation = pickBySeed(variationPool, seed + 47);
  const artStyle = posterVisualStyleGuides[visualStyleId] || posterVisualStyleGuides.natural;
  const formatPrompt = posterFormatGuides[formatId] || posterFormatGuides.portrait_4_5;
  const layoutPrompt = layoutGuides[String(settings.layout || "top")] || layoutGuides.top;
  const typographyHint = buildTypographyHint(settings);
  const subjectSafety = buildSubjectSafetyGuidance(subject);
  const hasReferenceImage = Boolean(input.referenceImage && input.referenceImage.data);

  return [
    "Create a high-quality background image for a Christian social media post.",
    "Image format: " + formatPrompt + ".",
    "Generate a pure background scene only, not a finished poster, quote card, book cover, flyer, title card, or social media template.",
    "Keep the composition suitable for later overlay text added by the app, but do not render any text in the image itself.",
    "Do not use any readable or unreadable letters, numbers, glyphs, captions, scripture references, verse fragments, logos, monograms, signage, book covers, paper scraps, screens, watermarks, or faux-typography textures anywhere in the image.",
    'Theme context: "' + topic + '".',
    'Spiritual emphasis: "' + shortenText(verseFocus || postText, 220) + '".',
    "Post tone: " + (postStyleGuides[postStyle] || postStyleGuides.inspiring) + ".",
    "Visual direction: " + scene + ".",
    "Visual style: " + artStyle + ".",
    "Subject-style lock: the selected subject must dominate the actual scene, and the selected visual style must change composition, materials, color behavior, camera language, and texture, not merely add a filter.",
    "Do not default back to a pastoral landscape when the selected subject is city, architecture, interior, people, abstract, texture, night, or street.",
    "Lighting: " + lighting + ".",
    "Color palette: " + palette + ".",
    "Mood: " + mood + ".",
    "Composition: " + composition + ".",
    "Typography support: " + typographyHint + ".",
    "Layout guidance: " + layoutPrompt + ".",
    hasReferenceImage
      ? "A user reference image is attached. Use it as inspiration for composition, atmosphere, palette, and visual motifs while still creating a fresh original background for this verse. Do not copy any text, logos, watermarks, or brand elements from the reference."
      : "No reference image is attached, so derive the visual completely from the prompt itself.",
    "Variation cue: " + variation + ".",
    "Make this generation visibly different from prior variants by changing camera distance, scene structure, focal plane, and atmospheric treatment while preserving readability for overlay text.",
    "Use imagery that faithfully matches the selected subject and still feels suitable for a Christian post.",
    "Subject guardrails: " + subjectSafety + ".",
    "Absolutely no text, no letters, no verses, no references, no font names, and no typography inside the image.",
    "Keep the intended text area calm, softly lit, elegant, and uncluttered so overlay text can be placed on top later.",
    "The result should feel peaceful, reverent, emotionally aligned with the post, and beautiful without looking generic.",
  ].join(" ");
}

function buildPostPrompt(input) {
  const topic = cleanText(input.topic);
  const reference = cleanText(input.reference);
  const verseText = cleanText(input.verseText);
  const verseFocus = cleanText(input.verseFocus);
  const selectionReason = cleanText(input.selectionReason);
  const tags = Array.isArray(input.tags) ? input.tags.map(cleanText).filter(Boolean) : [];
  const language = resolveLanguage(input.language);
  const style = String(input.postStyle || "inspiring");
  const topicLens = buildTopicLens(topic, tags);
  const allowEmojis = Boolean(input.allowEmojis);

  return [
    "You are a Protestant evangelical content editor writing short theological social posts.",
    "Write only in " + languageMeta[language].name + ".",
    "Base the post carefully on the given Bible verse and topic.",
    "The theology must be recognizably Protestant: Scripture-first, Christ-centered, grace-centered, calling for repentance, faith, holiness, and obedience as fruit of grace.",
    "Do not sound sacramentalist, prosperity-focused, manipulative, universalist, or works-righteous.",
    "The tone style must be: " + (postStyleGuides[style] || postStyleGuides.inspiring) + ".",
    "Storytelling shape for this style: " + (storytellingGuides[style] || storytellingGuides.inspiring) + ".",
    'Topic: "' + topic + '".',
    'Verse reference: "' + reference + '".',
    'Verse text: "' + verseText + '".',
    'Pastoral focus: "' + verseFocus + '".',
    selectionReason ? 'Why this verse was selected for the topic: "' + selectionReason + '".' : "",
    "Relevant tags: " + (tags.join(", ") || "general Christian discipleship") + ".",
    "Interpret the topic specifically rather than generically, naming the heart issue and the practical spiritual response.",
    "Pastoral application priorities: " + topicLens + ".",
    "Use a mini narrative arc: 1) recognizable real-life tension, 2) faithful turn to the verse, 3) theological center in Christ and grace, 4) concrete response before God.",
    "Do not invent fake testimonies, named characters, dramatic anecdotes, or unverifiable stories. Use implied everyday scenes instead.",
    "Move from faithful exposition of the verse to practical application and then to a direct call to respond before God.",
    "Be creatively vivid and memorable in phrasing, but stay sober, biblically grounded, pastorally responsible, and stylistically consistent.",
    "Write a short post for social media that is inspiring and calls to action, but remains theologically careful.",
    "Length requirement: the final post with hashtags must stay under 2000 characters.",
    "The very first line of the postBody must be the topic itself, exactly or almost exactly as provided.",
    "Structure requirement: 2 to 4 short paragraphs, then exactly 5 hashtags on the final line.",
    "Paragraph rhythm: the first paragraph should hook the reader with a human problem or tension; the middle should interpret the verse carefully; the ending should invite repentance, faith, prayer, obedience, or hope in Christ.",
    allowEmojis
      ? "You may use up to 3 tasteful emojis total in the body, sparingly and naturally. Do not put emojis in hashtags."
      : "Do not use emojis at all.",
    "Do not use markdown, bullet points, numbering, or quotation marks around the entire output.",
    "Return strict JSON only with keys: postBody, hashtags, verseText, reference.",
    "postBody must not contain hashtags.",
    "hashtags must be an array of exactly 5 strings starting with #.",
    "verseText must be a careful rendering of the verse in the target language suitable for the poster.",
    "reference must be the verse reference rendered naturally in the target language.",
  ].join(" ");
}

function buildScriptureSuggestionPrompt(input) {
  const topic = cleanText(input.topic);
  const language = resolveLanguage(input.language);
  const matchMode = String(input.matchMode || "explicit") === "implicit" ? "implicit" : "explicit";
  const library = Array.isArray(input.library) ? input.library : [];
  const compactLibrary = library.map(function (entry) {
    return {
      id: cleanText(entry.id),
      reference: cleanText(entry.reference),
      text: cleanText(entry.text),
      tags: Array.isArray(entry.tags) ? entry.tags.map(cleanText).filter(Boolean) : [],
    };
  });

  return [
    "You are a Protestant Scripture-topic matching editor.",
    "Write only in " + languageMeta[language].name + ".",
    "Your task is to select up to 8 Bible passages from the provided catalog for a Christian social post topic.",
    matchMode === "explicit"
      ? "Selection mode is explicit: prioritize verses that directly and clearly speak about the stated topic."
      : "Selection mode is implicit: prioritize verses that illuminate the deeper root issue, motives, wisdom, heart condition, repentance, covenant, hope, or discipleship beneath the topic.",
    "Do not force weak matches. Prefer theological faithfulness over cleverness.",
    "Reasons must be concise, natural, and user-facing, explaining why each verse fits this topic.",
    'Topic: "' + topic + '".',
    "Verse catalog: " + JSON.stringify(compactLibrary) + ".",
    "Return strict JSON only with one key: suggestions.",
    "suggestions must be an array of objects with keys: id, rationale.",
    "Use only ids that exist in the catalog.",
    "rationale must be 6 to 18 words long, in the target language, and should not quote the verse text verbatim.",
  ].join(" ");
}

function buildTopicTranslationPrompt(input) {
  const topic = cleanText(input.topic);
  const sourceLanguage = resolveLanguage(input.sourceLanguage || input.language);
  const targetLanguage = resolveLanguage(input.targetLanguage);

  return [
    "You are a precise translator for a Christian content app.",
    "Translate the topic naturally and faithfully.",
    "Keep the original meaning, tone, and directness.",
    "Do not turn it into a sermon, explanation, title, or paragraph.",
    "If the source is a question, keep it a question. If it is a phrase, keep it a phrase.",
    "Preserve brevity and everyday readability.",
    "Source language: " + languageMeta[sourceLanguage].name + ".",
    "Target language: " + languageMeta[targetLanguage].name + ".",
    'Topic: "' + topic + '".',
    "Return strict JSON only with key: topic.",
  ].join(" ");
}

function normalizeSuggestedScriptures(generated, library) {
  const libraryEntries = Array.isArray(library) ? library : [];
  const validIds = new Set(
    libraryEntries
      .map(function (entry) {
        return cleanText(entry.id);
      })
      .filter(Boolean)
  );
  const suggestions = Array.isArray(generated && generated.suggestions) ? generated.suggestions : [];
  const ids = [];
  const reasons = {};
  const seen = new Set();

  suggestions.forEach(function (entry) {
    const candidateId =
      typeof entry === "string"
        ? cleanText(entry)
        : cleanText(entry && entry.id);
    const rationale =
      typeof entry === "string"
        ? ""
        : cleanText(entry && entry.rationale);

    if (!candidateId || !validIds.has(candidateId) || seen.has(candidateId)) {
      return;
    }

    seen.add(candidateId);
    ids.push(candidateId);
    if (rationale) {
      reasons[candidateId] = shortenText(rationale, 140);
    }
  });

  return {
    ids: ids.slice(0, 8),
    reasons: reasons,
  };
}

function normalizeTranslatedTopic(generated, input) {
  const fallbackTopic = cleanText(input && input.topic);
  const translatedTopic = cleanText(
    (generated && generated.topic) ||
      (generated && generated.translation) ||
      (generated && generated.text)
  );

  return {
    topic: translatedTopic || fallbackTopic,
  };
}

function normalizeGeneratedPost(generated, input) {
  const language = resolveLanguage(input.language);
  const rawBody = cleanText(generated.postBody || generated.post || "");
  const body = prependTopicToPostBody(
    input.allowEmojis ? rawBody : stripEmojis(rawBody),
    input.topic
  );
  const hashtags = sanitizeHashtags(generated.hashtags, input.tags, language);
  const verseText = cleanText(generated.verseText || input.verseText);
  const reference = cleanText(generated.reference || input.reference);

  let post = body;
  if (hashtags.length) {
    post = body + "\n\n" + hashtags.join(" ");
  }

  if (post.length > 2000) {
    const available = Math.max(600, 2000 - hashtags.join(" ").length - 2);
    post = shortenText(body, available).replace(/[.,;:!?…\s]+$/u, "") + "\n\n" + hashtags.join(" ");
  }

  return {
    post: post,
    hashtags: hashtags,
    verseText: verseText,
    reference: reference,
  };
}

function prependTopicToPostBody(body, topic) {
  const cleanBody = cleanText(body);
  const cleanTopic = cleanText(topic);

  if (!cleanTopic) {
    return cleanBody;
  }

  if (normalize(cleanBody).startsWith(normalize(cleanTopic))) {
    const trailingBody = cleanBody
      .slice(cleanTopic.length)
      .replace(/^[\s.,;:!?-]+/u, "")
      .trim();

    if (!trailingBody) {
      return cleanTopic;
    }

    return cleanTopic + "\n\n" + trailingBody;
  }

  return cleanTopic + "\n\n" + cleanBody;
}

function selectMoodProfile(topic, verseFocus, tags) {
  const haystack = normalize([topic, verseFocus, tags.join(" ")].join(" "));

  for (const profile of moodProfiles) {
    if (profile.matches.some(function (match) { return haystack.includes(normalize(match)); })) {
      return profile;
    }
  }

  return {
    id: "default",
    scenes: [
      "a quiet sea horizon with gentle light and soft atmosphere",
      "a serene mountain valley with mist and morning air",
      "a peaceful forest clearing with calm natural light",
    ],
    lightings: ["soft morning glow", "gentle diffused daylight", "quiet sunrise atmosphere"],
    palettes: ["soft green, cream, muted blue", "pale gold, sage, light gray"],
    moods: ["peaceful", "hopeful", "reverent", "calm"],
  };
}

function pickSubjectScene(subject, profile, seed) {
  const pool = posterSubjectGuides[subject];
  if (pool && pool.length) {
    return pickBySeed(pool, seed);
  }
  return pickBySeed(profile.scenes, seed);
}

function buildTypographyHint(settings) {
  const typography = String(settings.typography || "noto_serif");
  const textOpacity = Number.isFinite(Number(settings.textOpacity)) ? Number(settings.textOpacity) : 92;
  const strokeStrength = Number.isFinite(Number(settings.strokeStrength)) ? Number(settings.strokeStrength) : 68;
  const typographyGuides = {
    noto_sans: "clean multilingual sans-serif overlay",
    noto_serif: "refined multilingual serif overlay",
    manrope: "bold modern sans-serif overlay",
    montserrat: "geometric sans-serif overlay",
    pt_serif: "classic church-publication serif overlay",
    lora: "elegant editorial serif overlay",
    merriweather: "warm long-form reading serif overlay",
    source_serif: "literary book-like serif overlay",
    playfair: "high-contrast elegant display serif overlay",
    cormorant: "graceful classical serif overlay",
    oswald: "condensed strong headline overlay",
    roboto_slab: "stable slab-serif editorial overlay",
  };

  return (
    "Preserve a calm, high-contrast negative space for a later " +
    (typographyGuides[typography] || typographyGuides.noto_serif) +
    ", with text opacity around " +
    textOpacity +
    "%, and outline strength around " +
    strokeStrength +
    "%. The image itself must contain no rendered letters or typography."
  );
}

function buildSubjectSafetyGuidance(subject) {
  const peopleSubjects = new Set(["people", "couple"]);
  const citySubjects = new Set(["city", "old_town", "street", "architecture", "interior"]);
  const abstractSubjects = new Set(["abstract", "texture"]);

  if (peopleSubjects.has(subject)) {
    return "people are allowed, but keep them anonymous, tasteful, calm, and non-uncanny; avoid celebrity likenesses, exaggerated expressions, or clutter";
  }

  if (citySubjects.has(subject)) {
    return "buildings and urban elements are allowed, but keep them elegant, uncluttered, and free of readable signage or text";
  }

  if (abstractSubjects.has(subject)) {
    return "stay non-literal, elegant, and atmospheric; avoid chaotic collage, random symbols, or embedded text";
  }

  return "avoid people, readable signs, embedded text, crosses, frames, collage, and distracting objects";
}

function buildTopicLens(topic, tags) {
  const haystack = normalize([topic, Array.isArray(tags) ? tags.join(" ") : ""].join(" "));
  const notes = [];

  for (const lens of topicLensGuides) {
    if (lens.matches.some(function (match) { return haystack.includes(normalize(match)); })) {
      notes.push(lens.guidance);
    }
  }

  if (!notes.length) {
    notes.push(
      "Clarify what obedience, repentance, hope, and trust in Christ look like in this theme, and ground the response in Scripture rather than emotion alone"
    );
  }

  return Array.from(new Set(notes)).join(" ");
}

function stripEmojis(value) {
  return cleanText(String(value || "").replace(/\p{Extended_Pictographic}|\uFE0F/gu, ""));
}

function sendStaticAssetFromRoot(requestPath, response, baseRoot, extraHeaders) {
  const normalizedRoot = path.resolve(baseRoot);
  const safePath = requestPath === "/" ? "/index.html" : requestPath;
  const assetPath = path.resolve(normalizedRoot, "." + safePath);

  if (!assetPath.startsWith(normalizedRoot)) {
    return sendJson(response, 403, { error: "Доступ запрещен." });
  }

  fs.readFile(assetPath, function (error, fileBuffer) {
    if (error) {
      if (error.code === "ENOENT") {
        sendJson(response, 404, { error: "Файл не найден." });
        return;
      }

      sendJson(response, 500, { error: "Не удалось прочитать файл." });
      return;
    }

    const extension = path.extname(assetPath).toLowerCase();
    response.writeHead(
      200,
      Object.assign(
        {
          "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
          "Cache-Control": "no-store",
        },
        extraHeaders || {}
      )
    );
    response.end(fileBuffer);
  });
}

function redirectToView(response, view, subPath, searchParams) {
  const basePath = view === MOBILE_VIEW ? MOBILE_BASE_PATH : DESKTOP_BASE_PATH;
  const params = new URLSearchParams(searchParams || "");
  params.delete("view");

  const normalizedSubPath =
    typeof subPath === "string" && subPath.startsWith("/") ? subPath : "/";
  const location =
    basePath +
    (normalizedSubPath === "/" ? "/" : normalizedSubPath) +
    (params.toString() ? "?" + params.toString() : "");

  response.writeHead(302, {
    Location: location,
    "Cache-Control": "no-store",
    "Set-Cookie": serializeViewCookie(view),
  });
  response.end();
}

function serializeViewCookie(view) {
  return VIEW_COOKIE_NAME + "=" + view + "; Path=/; Max-Age=2592000; SameSite=Lax";
}

function getPreferredView(request) {
  const cookies = parseCookies(request.headers.cookie || "");
  const cookieView = normalizeViewName(cookies[VIEW_COOKIE_NAME]);
  if (cookieView) {
    return cookieView;
  }

  return isMobileRequest(request) ? MOBILE_VIEW : DESKTOP_VIEW;
}

function parseCookies(cookieHeader) {
  return String(cookieHeader || "")
    .split(";")
    .map(function (chunk) {
      return chunk.trim();
    })
    .filter(Boolean)
    .reduce(function (accumulator, chunk) {
      const separatorIndex = chunk.indexOf("=");
      if (separatorIndex === -1) {
        return accumulator;
      }

      const key = chunk.slice(0, separatorIndex).trim();
      const value = chunk.slice(separatorIndex + 1).trim();
      accumulator[key] = decodeURIComponent(value);
      return accumulator;
    }, {});
}

function normalizeViewName(value) {
  if (value === DESKTOP_VIEW || value === MOBILE_VIEW) {
    return value;
  }

  return "";
}

function isEntryRoute(requestPath) {
  return (
    requestPath === "/" ||
    requestPath === DESKTOP_BASE_PATH ||
    requestPath === DESKTOP_BASE_PATH + "/" ||
    requestPath === MOBILE_BASE_PATH ||
    requestPath === MOBILE_BASE_PATH + "/"
  );
}

function isMobileRequest(request) {
  const mobileHint = String(request.headers["sec-ch-ua-mobile"] || "").trim();
  if (mobileHint === "?1") {
    return true;
  }

  const userAgent = String(request.headers["user-agent"] || "").toLowerCase();
  return /android|iphone|ipad|ipod|mobile|windows phone|opera mini|blackberry|webos/i.test(
    userAgent
  );
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function readJsonBody(request) {
  return new Promise(function (resolve, reject) {
    const chunks = [];
    let totalBytes = 0;

    request.on("data", function (chunk) {
      totalBytes += chunk.length;
      if (totalBytes > 1_000_000) {
        reject(new Error("Слишком большой запрос."));
        request.destroy();
        return;
      }

      chunks.push(chunk);
    });

    request.on("end", function () {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Неверный JSON в теле запроса."));
      }
    });

    request.on("error", function () {
      reject(new Error("Не удалось прочитать тело запроса."));
    });
  });
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/u);

  lines.forEach(function (line) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const delimiter = trimmed.indexOf("=");
    if (delimiter === -1) {
      return;
    }

    const key = trimmed.slice(0, delimiter).trim();
    let value = trimmed.slice(delimiter + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  });
}

function getImageModel() {
  return process.env.GEMINI_IMAGE_MODEL || DEFAULT_IMAGE_MODEL;
}

function getTextModel() {
  return process.env.GEMINI_TEXT_MODEL || DEFAULT_TEXT_MODEL;
}

function resolveLanguage(language) {
  return languageMeta[language] ? language : "ru";
}

function sanitizeHashtags(rawHashtags, rawTags, language) {
  const supplied = Array.isArray(rawHashtags) ? rawHashtags : [];
  const cleaned = supplied
    .map(function (tag) {
      return "#" + String(tag || "").replace(/^#+/u, "").replace(/\s+/gu, "").trim();
    })
    .filter(function (tag) {
      return tag.length > 1;
    });

  const fallbackFromTags = Array.isArray(rawTags)
    ? rawTags.map(function (tag) { return "#" + normalizeHashtag(tag); }).filter(Boolean)
    : [];

  const merged = Array.from(
    new Set(cleaned.concat(fallbackFromTags).concat(languageMeta[language].fallbackHashtags))
  );

  return merged.slice(0, 5);
}

function normalizeHashtag(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

function pickBySeed(items, seed) {
  return items[Math.abs(seed) % items.length];
}

function hashString(value) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return hash;
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function shortenText(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }

  return value.slice(0, maxLength - 1).trim() + "…";
}

function normalize(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^\p{L}\p{N}\s]/gu, " ");
}

if (require.main === module) {
  const server = createServer();

  server.listen(PORT, HOST, function () {
    console.log("Post Maker server is running at http://" + HOST + ":" + PORT);
  });
}

module.exports = {
  buildGeminiPrompt,
  createServer,
};
