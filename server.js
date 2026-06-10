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
const PACKAGE_PATH = path.join(APP_ROOT, "package.json");
const IMAGE_USAGE_PATH = path.join(APP_ROOT, "data", "image-usage.json");

loadEnvFile(ENV_PATH);

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const APP_VERSION = readPackageVersion(PACKAGE_PATH) || "1.2.9";
const DEFAULT_IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image-preview";
const DEFAULT_TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash";
const DEFAULT_SEARCH_TEXT_MODEL = process.env.GEMINI_SEARCH_TEXT_MODEL || DEFAULT_TEXT_MODEL;
const DEFAULT_TEXT_FALLBACK_MODELS = "gemini-2.5-flash-lite,gemini-3.1-flash-lite";
const DEFAULT_IMAGE_FALLBACK_MODELS = "gemini-2.5-flash-image";
const DEFAULT_OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";
const DEFAULT_IMAGE_PROVIDER_ORDER = process.env.AI_IMAGE_PROVIDER_ORDER || "gemini,cloudflare,huggingface,qwen,pollinations";
const DEFAULT_CLOUDFLARE_IMAGE_MODEL = process.env.CLOUDFLARE_IMAGE_MODEL || "@cf/black-forest-labs/flux-1-schnell";
const DEFAULT_HUGGINGFACE_IMAGE_MODEL = process.env.HUGGINGFACE_IMAGE_MODEL || "black-forest-labs/FLUX.1-schnell";
const DEFAULT_DASHSCOPE_IMAGE_MODEL = process.env.DASHSCOPE_IMAGE_MODEL || "qwen-image-2.0-pro";
const DEFAULT_DASHSCOPE_BASE_URL = process.env.DASHSCOPE_BASE_URL || "https://dashscope-intl.aliyuncs.com/api/v1";
const DEFAULT_POLLINATIONS_BASE_URL = process.env.POLLINATIONS_BASE_URL || "https://image.pollinations.ai";
const DEFAULT_POLLINATIONS_IMAGE_MODEL = process.env.POLLINATIONS_IMAGE_MODEL || "flux";
const DEFAULT_POLLINATIONS_TIMEOUT_MS = Number(process.env.POLLINATIONS_TIMEOUT_MS || 60000);
const DEFAULT_IMAGE_PROVIDER_TIMEOUT_MS = Number(process.env.IMAGE_PROVIDER_TIMEOUT_MS || 90000);
const DEFAULT_POLLINATIONS_RETRY_ATTEMPTS = Number(process.env.POLLINATIONS_RETRY_ATTEMPTS || 3);
const DEFAULT_POLLINATIONS_RETRY_DELAY_MS = Number(process.env.POLLINATIONS_RETRY_DELAY_MS || 4500);
const DEFAULT_POLLINATIONS_QUEUE_RETRY_ATTEMPTS = Number(process.env.POLLINATIONS_QUEUE_RETRY_ATTEMPTS || 7);
const DEFAULT_POLLINATIONS_QUEUE_RETRY_DELAY_MS = Number(process.env.POLLINATIONS_QUEUE_RETRY_DELAY_MS || 9000);
const IMAGE_TEXT_ARTIFACT_NEGATIVE_PROMPT = [
  "text",
  "letters",
  "words",
  "numbers",
  "glyphs",
  "fake typography",
  "gibberish writing",
  "caption",
  "title",
  "subtitle",
  "scripture reference",
  "logo",
  "watermark",
  "signature",
  "stamp",
  "seal",
  "badge",
  "cross",
  "religious symbol",
  "poster",
  "quote card",
  "flyer",
  "book cover",
  "album cover",
  "sign",
  "label",
  "paper",
  "page",
  "screen",
  "blur",
  "blurry",
  "soft focus",
  "frosted glass",
  "haze panel",
  "misty panel",
  "soft rectangle",
  "blurred center",
  "low-detail center",
].join(", ");
const SERVER_STARTED_AT = new Date().toISOString();

let latestJob = {
  id: "idle",
  status: "idle",
  title: "Нет активной задачи",
  progress: 0,
  createdAt: SERVER_STARTED_AT,
  updatedAt: SERVER_STARTED_AT,
};
let pollinationsRequestQueue = Promise.resolve();

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
      "a quiet lake at sunrise with transparent clear morning air",
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
      "a still mountain lake with clear reflective water",
      "a quiet forest path with crisp blue morning air",
      "a gentle river landscape with calm overcast light and atmospheric depth",
    ],
    lightings: ["soft blue morning light", "delicate cloudy glow", "quiet post-rain light"],
    palettes: ["dusty blue, cool gray, soft green", "cool blue, warm cream, muted pine"],
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
  "change the viewpoint and foreground-midground structure without creating a blank center patch",
  "make the horizon a little higher and the foreground softer",
  "use clearer atmospheric depth and crisp scene separation",
  "lean into a more cinematic but still realistic composition",
  "make the composition more minimal and editorial while preserving natural detail across the whole frame",
  "add a delicate sense of fresh air after rain",
];

const compositionPool = [
  "portrait 4:5 environmental composition with natural detail across the full frame",
  "editorial image composition with organic foreground, midground, and background depth",
  "balanced landscape composition with no artificial blank center zone, frame, low-detail patch, or washed-out center",
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

const postStyleDifferentiators = {
  soft:
    "Use a pastoral letter shape: gentle address, one tender tension, one clear Scripture comfort, one small obedient step. Avoid slogans and pressure.",
  inspiring:
    "Use a challenge-and-response shape: strong opening tension, Scripture as courage, energetic hope, clear action step. Make the cadence forward-moving.",
  conservative:
    "Use a compact exposition shape: state the issue soberly, explain the verse, name doctrine, call for ordered obedience. Avoid trendy phrases.",
  modern:
    "Use a crisp social-post shape: short lines, direct language, concrete everyday pressure, practical response. Avoid old sermon phrasing.",
  historical:
    "Use a classic Protestant sermon turn: human condition, Scripture's judgment, Christ-centered grace, earnest appeal to conscience.",
  pastoral:
    "Use a shepherding shape: name the burden, slow the reader down, apply the verse to conscience, offer prayerful guidance.",
  evangelistic:
    "Use a gospel-invitation shape: expose the heart issue, present Christ and grace, call for repentance and faith without manipulation.",
  meditative:
    "Use a contemplative shape: quiet opening, slow reflection on the verse, self-examination, prayerful obedience. Keep the pace unhurried.",
  poetic:
    "Use an image-led shape: vivid but sober metaphor, lyrical transitions, Scripture as light, worshipful final resolve. Avoid vague prettiness.",
};

const postVariantAngles = [
  "Change the opening image and paragraph rhythm from previous attempts; do not reuse generic phrasing.",
  "Focus on the hidden heart motive behind the topic and make the application more concrete.",
  "Start from an everyday pressure point, then turn sharply to the verse and a practical response.",
  "Make the post more theologically explicit while keeping it readable for social media.",
  "Use a fresh pastoral angle and different hashtags from a typical first draft.",
  "Make the final call to action distinct, specific, and grounded in the selected verse.",
];

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
    "a peaceful wide landscape with natural depth across the full frame",
    "an open scenic horizon with quiet atmosphere and organic full-frame detail",
    "a serene panoramic nature setting with calm balance",
  ],
  sea: [
    "a calm sea coast with spacious sky and gentle waves",
    "a tranquil ocean horizon with soft motion and open air",
    "a peaceful shoreline with elegant light and natural coastal depth",
  ],
  forest: [
    "a quiet forest path with airy light and subtle depth",
    "a peaceful woodland clearing with soft atmosphere",
    "a serene forest scene with gentle light between trees",
  ],
  mountains: [
    "a mountain overlook with wide natural distance and contemplative depth",
    "a layered mountain valley with clean air and calm grandeur",
    "a peaceful alpine scene with structured depth and soft light",
  ],
  meadow: [
    "a sunlit meadow with soft grass, quiet movement, and open composition",
    "a calm field landscape with warm air and natural full-frame texture",
    "a gentle meadow horizon with elegant natural softness",
  ],
  sunrise: [
    "a quiet sunrise scene with luminous horizon and calm atmosphere",
    "a dawn landscape with hopeful light and soft pastel air",
    "an early morning horizon with subtle glow and natural depth through the frame",
  ],
  sunset: [
    "a calm sunset horizon with layered warm light and open sky",
    "a peaceful dusk landscape with glowing clouds and soft atmosphere",
  ],
  sky: [
    "a spacious sky with elegant cloud formations and open breathing room",
    "a soft atmospheric cloudscape with natural cloud detail and no blank title zone",
  ],
  lake: [
    "a still lake with reflective water and quiet morning light",
    "a peaceful lake shore with clear reflective air and gentle open composition",
  ],
  river: [
    "a calm river scene with flowing water and contemplative depth",
    "a serene riverside landscape with soft natural rhythm and consistent detail",
  ],
  desert: [
    "a refined desert landscape with wind-shaped dunes and quiet light",
    "a spacious desert horizon with soft sand tones and peaceful stillness",
  ],
  flowers: [
    "a delicate floral landscape with airy blossoms and organic full-frame detail",
    "a peaceful garden scene with soft flowers, clear diffused light, and refined balance",
  ],
  rain: [
    "a rain-washed scene with clean reflections and calm atmosphere",
    "a gentle fog-and-rain landscape with poetic depth and subdued motion",
  ],
  city: [
    "a calm modern city skyline with atmospheric light and natural urban depth",
    "an elegant urban horizon with clear air, reflective surfaces, and consistent central detail",
  ],
  old_town: [
    "a peaceful old town street with timeless architecture and gentle light",
    "a historic city view with warm stone tones, calm atmosphere, and open composition",
  ],
  street: [
    "a quiet city street with soft evening light and coherent perspective detail",
    "an atmospheric street scene with refined perspective and restrained visual clutter",
  ],
  architecture: [
    "a minimalist architectural scene with clean lines, symmetry, and premium calm",
    "an elegant building composition with geometric order and natural material detail",
  ],
  interior: [
    "a serene interior with soft natural light, clean surfaces, and contemplative mood",
    "a calm room scene with warm textures and coherent full-frame detail",
  ],
  people: [
    "a tasteful scene with one or two anonymous people in a calm environment, small in frame, elegant and reverent",
    "an atmospheric human-centered scene with distant figures, soft light, and natural environmental detail",
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
    "a calm night scene with soft city or landscape lights and natural dark detail",
    "a moonlit or evening atmosphere with restrained glow and contemplative stillness",
  ],
  abstract: [
    "an abstract atmospheric composition with light, gradients, and spiritual calm",
    "a non-literal visual field of luminous shapes and soft depth without blank caption areas",
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
    "premium magazine editorial photography, deliberate art direction, refined styling, polished full-frame composition",
  cinematic:
    "cinematic film still, dramatic depth, motivated light, anamorphic atmosphere, strong foreground-background separation",
  minimalist:
    "minimalist art direction, reduced objects, restrained palette, calm geometry, natural detail without empty center panels",
  painterly:
    "fine-art painting language, visible brush texture, layered color transitions, handcrafted atmosphere, not photorealistic",
  vintage_film:
    "1970s analog film photography, soft grain, faded contrast, imperfect exposure, nostalgic lens character",
  dreamy:
    "ethereal dreamlike scene, luminous clear glow, crisp highlights, delicate surreal atmosphere",
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
    "wide 16:9 format, 1920 by 1080 composition, horizontal cinematic crop with coherent full-frame detail",
  facebook_link_1200_630:
    "wide 1200 by 630 social link preview format, low-height horizontal crop with no artificial center panel",
  pinterest_2_3:
    "vertical Pinterest 2:3 format, 1000 by 1500 composition, tall editorial crop with strong top-to-bottom rhythm",
};

const layoutGuides = {
  top: "keep the upper half part of the same natural scene, without any blank or washed-out upper panel",
  center: "keep the center part of the same natural scene, without any washed-out central patch",
  bottom: "keep the lower half part of the same natural scene, without any blank or washed-out lower panel",
};

const diffusionFormatGuides = {
  portrait_4_5: "vertical portrait crop with coherent natural detail from edge to edge",
  story_9_16: "tall vertical cinematic crop with spacious upper and lower breathing room",
  square_1_1: "balanced square crop with coherent natural detail from edge to edge",
  landscape_16_9: "wide horizontal cinematic crop with natural central detail",
  facebook_link_1200_630: "wide low-height crop with no blank central atmosphere panel",
  pinterest_2_3: "tall editorial crop with strong vertical rhythm",
};

const diffusionLayoutGuides = {
  top: "upper half remains a real part of the scene, not a smoothed blank panel",
  center: "middle area remains a real part of the scene, not a smoothed blank panel",
  bottom: "lower half remains a real part of the scene, not a smoothed blank panel",
};


function nowIso() {
  return new Date().toISOString();
}

function clampProgress(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return null;
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

function createTrackedJob(title) {
  const now = nowIso();
  const job = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    status: "running",
    state: "running",
    title,
    name: title,
    progress: 1,
    createdAt: now,
    updatedAt: now,
  };
  latestJob = job;
  return job;
}

function updateJob(job, progress, title) {
  if (!job) return;
  const nextProgress = clampProgress(progress);
  if (nextProgress !== null) job.progress = nextProgress;
  if (title) {
    job.title = title;
    job.name = title;
  }
  job.updatedAt = nowIso();
  latestJob = Object.assign({}, job);
}

function completeJob(job, title) {
  if (!job) return;
  job.status = "completed";
  job.state = "completed";
  job.progress = 100;
  if (title) {
    job.title = title;
    job.name = title;
  }
  job.completedAt = nowIso();
  job.updatedAt = job.completedAt;
  latestJob = Object.assign({}, job);
}

function failJob(job, error) {
  if (!job) return;
  const message = error && error.message ? error.message : "Ошибка выполнения задачи";
  job.status = "failed";
  job.state = "failed";
  job.progress = 100;
  job.title = message;
  job.name = message;
  job.error = message;
  job.completedAt = nowIso();
  job.updatedAt = job.completedAt;
  latestJob = Object.assign({}, job);
}

async function runTrackedJob(title, runner) {
  const job = createTrackedJob(title);
  try {
    const result = await runner(job);
    completeJob(job, `${title} готово`);
    return result;
  } catch (error) {
    failJob(job, error);
    throw error;
  }
}

function buildStatusPayload() {
  return {
    ok: true,
    service: "post-maker",
    version: APP_VERSION,
    status: "online",
    startedAt: SERVER_STARTED_AT,
    uptimeSeconds: Math.round(process.uptime()),
    provider: "multi",
    textEnabled: Boolean(process.env.GEMINI_API_KEY),
    imageEnabled: hasAiImageProvider(),
    imageProviders: getEnabledImageProviders(),
    imageProviderUsage: getImageProviderUsageSummary(),
    model: getImageModel(),
    textModel: getTextModel(),
    freeModelsOnly: isFreeAiPolicyEnabled(),
    aiPolicy: getAiPolicySummary(),
    job: latestJob,
    task: latestJob,
    updatedAt: nowIso(),
  };
}

function createServer() {
  return http.createServer(async function (request, response) {
    try {
      const requestUrl = new URL(request.url || "/", "http://localhost");

      if (request.method === "GET" && requestUrl.pathname === "/api/status") {
        return sendJson(response, 200, buildStatusPayload());
      }

      if (request.method === "GET" && requestUrl.pathname === "/api/jobs/latest") {
        return sendJson(response, 200, { job: latestJob });
      }

      if (request.method === "GET" && requestUrl.pathname === "/api/config") {
        return sendJson(response, 200, {
          version: APP_VERSION,
          available: true,
          textEnabled: Boolean(process.env.GEMINI_API_KEY),
          imageEnabled: hasAiImageProvider(),
          imageProviders: getEnabledImageProviders(),
          imageProviderUsage: getImageProviderUsageSummary(),
          model: getImageModel(),
          textModel: getTextModel(),
          freeModelsOnly: isFreeAiPolicyEnabled(),
          aiPolicy: getAiPolicySummary(),
          googleSearchEnabled: isGoogleSearchGroundingEnabled(),
          searchTextModel: getSearchTextModel(),
          provider: "multi",
        });
      }

      if (request.method === "GET" && requestUrl.pathname === "/api/image-usage") {
        return sendJson(response, 200, {
          version: APP_VERSION,
          imageProviders: getEnabledImageProviders(),
          imageProviderUsage: getImageProviderUsageSummary(),
        });
      }

      if (request.method === "POST" && requestUrl.pathname === "/api/generate-post") {
        const body = await readJsonBody(request);

        if (!process.env.GEMINI_API_KEY) {
          return sendJson(response, 503, {
            error: "GEMINI_API_KEY не задан. Добавьте его в .env и перезапустите сервер.",
          });
        }

        const payload = await runTrackedJob("Генерация поста", async function (job) {
          updateJob(job, 20, "Собираю промпт для текста");
          const prompt = buildPostPrompt(body);
          updateJob(job, 45, "Жду ответ Gemini");
          const generated = await requestGeminiJson(prompt, getTextModel());
          updateJob(job, 80, "Нормализую пост и хэштеги");
          const normalized = normalizeGeneratedPost(generated, body);
          return {
            provider: "gemini",
            model: generated.__model || getTextModel(),
            prompt: prompt,
            post: normalized.post,
            hashtags: normalized.hashtags,
            verseText: normalized.verseText,
            reference: normalized.reference,
          };
        });

        return sendJson(response, 200, payload);
      }

      if (request.method === "POST" && requestUrl.pathname === "/api/suggest-scriptures") {
        const body = await readJsonBody(request);

        if (!process.env.GEMINI_API_KEY) {
          return sendJson(response, 503, {
            error: "GEMINI_API_KEY не задан. Добавьте его в .env и перезапустите сервер.",
          });
        }

        const payload = await runTrackedJob("Подбор мест Писания", async function (job) {
          updateJob(job, 20, "Готовлю список вариантов");
          const prompt = buildScriptureSuggestionPrompt(body);
          const useGoogleSearch = isGoogleSearchGroundingEnabled();
          updateJob(job, 45, "Жду ответ Gemini");
          const generated = await requestGeminiJson(prompt, getSearchTextModel(), {
            temperature: useGoogleSearch ? 0.78 : 0.65,
            googleSearch: useGoogleSearch,
          });
          updateJob(job, 82, "Привожу рекомендации к формату");
          const normalized = normalizeSuggestedScriptures(generated, body);
          const grounding = generated && generated.__groundingMetadata;
          return {
            provider: "gemini",
            model: generated.__model || getSearchTextModel(),
            prompt: prompt,
            googleSearchEnabled: useGoogleSearch,
            researchSources: extractGroundingSources(grounding),
            searchQueries: extractGroundingQueries(grounding),
            topicResearch: normalized.topicResearch,
            suggestions: normalized.suggestions,
            ids: normalized.ids,
            reasons: normalized.reasons,
          };
        });

        return sendJson(response, 200, payload);
      }

      if (request.method === "POST" && requestUrl.pathname === "/api/translate-topic") {
        const body = await readJsonBody(request);

        if (!process.env.GEMINI_API_KEY) {
          return sendJson(response, 503, {
            error: "GEMINI_API_KEY не задан. Добавьте его в .env и перезапустите сервер.",
          });
        }

        const payload = await runTrackedJob("Перевод темы", async function (job) {
          updateJob(job, 25, "Готовлю перевод темы");
          const prompt = buildTopicTranslationPrompt(body);
          updateJob(job, 55, "Жду ответ Gemini");
          const generated = await requestGeminiJson(prompt, getTextModel(), { temperature: 0.2 });
          updateJob(job, 86, "Проверяю формат перевода");
          const normalized = normalizeTranslatedTopic(generated, body);
          return {
            provider: "gemini",
            model: getTextModel(),
            prompt: prompt,
            topic: normalized.topic,
          };
        });

        return sendJson(response, 200, payload);
      }

      if (request.method === "POST" && requestUrl.pathname === "/api/generate-background") {
        const body = await readJsonBody(request);

        const payload = await runTrackedJob("Генерация фона", async function (job) {
          updateJob(job, 18, "Проверяю reference image");
          const referenceImage = normalizeReferenceImagePayload(body.referenceImage);
          updateJob(job, 35, "Собираю промпт для фона");
          const promptInput = Object.assign({}, body, { referenceImage: referenceImage });
          const prompt = buildGeminiPrompt(promptInput);
          const model = getImageModel();
          const image = await requestBackgroundImage(promptInput, prompt, model, referenceImage, function (progress, title) {
            updateJob(job, progress, title);
          });
          updateJob(job, 90, "Готовлю изображение для интерфейса");
          return {
            provider: image.provider || "gemini",
            model: image.model || model,
            prompt: prompt,
            imageDataUrl: image.dataUrl,
            mimeType: image.mimeType,
            warning: image.warning || "",
          };
        });

        return sendJson(response, 200, payload);
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
  const useGoogleSearch = Boolean(options && options.googleSearch);
  const generationConfig = {
    temperature:
      options && Number.isFinite(Number(options.temperature))
        ? Number(options.temperature)
        : 0.95,
  };

  if (!useGoogleSearch) {
    generationConfig.responseMimeType = "application/json";
  }

  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: generationConfig,
  };

  if (useGoogleSearch) {
    requestBody.tools = [{ google_search: {} }];
  }

  const modelCandidates = getGeminiModelCandidates(model, "GEMINI_TEXT_FALLBACK_MODELS", DEFAULT_TEXT_FALLBACK_MODELS);
  let response = null;
  let payload = null;
  let usedModel = modelCandidates[0] || model;

  for (const candidateModel of modelCandidates) {
    usedModel = candidateModel;
    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      encodeURIComponent(candidateModel) +
      ":generateContent";
    const apiResult = await requestGeminiApi(endpoint, requestBody);
    response = apiResult.response;
    payload = apiResult.payload;

    if (response.ok || !isRetryableGeminiStatus(response.status)) {
      break;
    }
  }

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

  const parsed = parseJsonPayload(rawText);
  const groundingMetadata = extractGroundingMetadata(payload);

  if (parsed && typeof parsed === "object") {
    Object.defineProperty(parsed, "__groundingMetadata", {
      value: groundingMetadata,
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(parsed, "__model", {
      value: usedModel,
      enumerable: false,
      configurable: true,
    });
  }

  return parsed;
}

async function requestGeminiApi(endpoint, body) {
  const maxAttempts = 2;
  let response = null;
  let payload = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(function () {
      controller.abort();
    }, 12000);
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      try {
        payload = await response.json();
      } catch {
        payload = {};
      }
    } catch (error) {
      response = {
        ok: false,
        status: 503,
      };
      payload = {
        error: {
          message:
            error && error.name === "AbortError"
              ? "Gemini API request timed out."
              : error && error.message
                ? error.message
                : "Gemini API request failed.",
        },
      };
    } finally {
      clearTimeout(timeout);
    }

    if (response.ok || !isRetryableGeminiStatus(response.status) || attempt === maxAttempts) {
      break;
    }

    await delay(650 * attempt * attempt);
  }

  return {
    response: response,
    payload: payload || {},
  };
}

function isRetryableGeminiStatus(statusCode) {
  return statusCode === 429 || statusCode === 500 || statusCode === 502 || statusCode === 503 || statusCode === 504;
}

function delay(milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}

async function requestBackgroundImage(input, prompt, model, referenceImage, onProgress) {
  const providers = getEnabledImageProviders();
  const errors = [];

  for (const provider of providers) {
    if (provider === "gemini") {
      if (!process.env.GEMINI_API_KEY) {
        errors.push(new Error("Gemini key is not configured."));
        continue;
      }

      try {
        if (onProgress) onProgress(56, "Генерирую изображение через Gemini");
        const image = await requestGeminiImage(prompt, model, referenceImage, input);
        recordImageProviderResult(provider, true, null, image.model);
        return image;
      } catch (error) {
        recordImageProviderResult(provider, false, error, model);
        errors.push(error);
        continue;
      }
    }

    if (provider === "cloudflare") {
      if (referenceImage) {
        errors.push(new Error("Cloudflare Flux fallback skipped because a reference image was attached."));
        continue;
      }

      try {
        if (onProgress) onProgress(62, "Пробую Cloudflare Workers AI / Flux");
        const image = await requestCloudflareImage(input, prompt);
        recordImageProviderResult(provider, true, null, image.model);
        return image;
      } catch (error) {
        recordImageProviderResult(provider, false, error, getCloudflareImageModel());
        errors.push(error);
        continue;
      }
    }

    if (provider === "huggingface") {
      if (referenceImage) {
        errors.push(new Error("Hugging Face fallback skipped because a reference image was attached."));
        continue;
      }

      try {
        if (onProgress) onProgress(66, "Пробую Hugging Face / Flux");
        const image = await requestHuggingFaceImage(input, prompt);
        recordImageProviderResult(provider, true, null, image.model);
        return image;
      } catch (error) {
        recordImageProviderResult(provider, false, error, getHuggingFaceImageModel());
        errors.push(error);
        continue;
      }
    }

    if (provider === "qwen") {
      if (referenceImage) {
        errors.push(new Error("Qwen fallback skipped because a reference image was attached."));
        continue;
      }

      try {
        if (onProgress) onProgress(68, "Пробую Qwen Image / DashScope");
        const image = await requestDashscopeQwenImage(input, prompt);
        recordImageProviderResult(provider, true, null, image.model);
        return image;
      } catch (error) {
        recordImageProviderResult(provider, false, error, getDashscopeImageModel());
        errors.push(error);
        continue;
      }
    }

    if (provider === "pollinations") {
      if (referenceImage) {
        errors.push(new Error("Pollinations fallback skipped because a reference image was attached."));
        continue;
      }

      try {
        if (onProgress) onProgress(70, "Gemini недоступен, пробую бесплатный Pollinations/Flux");
        const image = await requestPollinationsImage(input, prompt);
        recordImageProviderResult(provider, true, null, image.model);
        return image;
      } catch (error) {
        recordImageProviderResult(provider, false, error, getPollinationsImageModel());
        errors.push(error);
        continue;
      }
    }

    if (provider === "local" && isLocalImageFallbackEnabled()) {
      if (onProgress) onProgress(80, "AI-провайдеры недоступны, собираю локальный fallback-фон");
      const image = buildFallbackBackgroundImage(input, prompt, combineProviderErrors(errors));
      recordImageProviderResult(provider, true, null, image.model);
      return image;
    }
  }

  throw buildImageProvidersUnavailableError(errors);
}

function combineProviderErrors(errors) {
  const messages = (Array.isArray(errors) ? errors : [])
    .map(function (error) {
      return error && error.message ? error.message : "";
    })
    .filter(Boolean);

  if (!messages.length) {
    return new Error("AI image providers are unavailable.");
  }

  return new Error(messages.slice(0, 3).join(" | "));
}

function buildImageProvidersUnavailableError(errors) {
  const combined = combineProviderErrors(errors);
  const userMessage = getImageProviderUserMessage(combined);
  const error = new Error(
    "AI-генераторы изображения сейчас недоступны. Я не подставляю SVG-фон вместо AI-картинки. " +
      userMessage
  );
  error.statusCode = 503;
  return error;
}

function getImageProviderUserMessage(error) {
  const message = String(error && error.message ? error.message : "");

  if (isPollinationsQueueFullError(error)) {
    return "Pollinations уже обрабатывает предыдущий фон для этого IP. Я сделал более длинное ожидание в сервере; если очередь снова занята, подождите 30-60 секунд и нажмите «Новый фон» еще раз.";
  }

  if (isQuotaLikeError(error)) {
    return "Похоже, бесплатная квота основного image-провайдера на сегодня закончилась. Попробуйте позже или включите еще один бесплатный image-провайдер в настройках сервера.";
  }

  return "Подождите минуту и нажмите «Новый фон» еще раз. " + shortenText(message, 220);
}

async function requestGeminiImage(prompt, model, referenceImage, input) {
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

  const modelCandidates = getGeminiModelCandidates(model, "GEMINI_IMAGE_FALLBACK_MODELS", DEFAULT_IMAGE_FALLBACK_MODELS);
  let response = null;
  let payload = null;
  let usedModel = modelCandidates[0] || model;

  for (const candidateModel of modelCandidates) {
    usedModel = candidateModel;
    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      encodeURIComponent(candidateModel) +
      ":generateContent";
    const apiResult = await requestGeminiApi(endpoint, {
      contents: [
        {
          parts: parts,
        },
      ],
      generationConfig: buildGeminiImageGenerationConfig(candidateModel, input),
    });
    response = apiResult.response;
    payload = apiResult.payload;

    if (response.ok || !isRetryableGeminiStatus(response.status)) {
      break;
    }
  }

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
    provider: "gemini",
    model: usedModel,
    mimeType: inline.mimeType || "image/png",
    dataUrl: "data:" + (inline.mimeType || "image/png") + ";base64," + inline.data,
  };
}

function buildGeminiImageGenerationConfig(model, input) {
  const imageConfig = {
    aspectRatio: getGeminiAspectRatio(input && input.posterSettings && input.posterSettings.format),
  };

  if (model !== "gemini-2.5-flash-image") {
    imageConfig.imageSize = process.env.GEMINI_IMAGE_SIZE || "2K";
  }

  return {
    responseModalities: ["IMAGE"],
    imageConfig: imageConfig,
  };
}

function getGeminiAspectRatio(formatId) {
  const ratios = {
    portrait_4_5: "4:5",
    story_9_16: "9:16",
    square_1_1: "1:1",
    landscape_16_9: "16:9",
    facebook_link_1200_630: "16:9",
    pinterest_2_3: "2:3",
  };

  return ratios[String(formatId || "")] || ratios.portrait_4_5;
}

async function requestCloudflareImage(input, prompt) {
  const imagePrompt = buildHighQualityImagePrompt(input, prompt, 1900);
  const endpoint =
    "https://api.cloudflare.com/client/v4/accounts/" +
    encodeURIComponent(process.env.CLOUDFLARE_ACCOUNT_ID) +
    "/ai/run/" +
    getCloudflareImageModel();
  const seed = getImageSeed(input);
  const response = await fetchWithTimeout(endpoint, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.CLOUDFLARE_API_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: imagePrompt,
      seed: seed,
      steps: Math.max(4, Math.min(8, Number(process.env.CLOUDFLARE_IMAGE_STEPS || 8))),
    }),
  }, DEFAULT_IMAGE_PROVIDER_TIMEOUT_MS);

  if (!response.ok) {
    throw await buildHttpError(response, "Cloudflare Workers AI image API failed");
  }

  const contentType = String(response.headers.get("content-type") || "");
  if (contentType.startsWith("image/")) {
    return imageFromArrayBuffer("cloudflare", getCloudflareImageModel(), contentType, await response.arrayBuffer(), imagePrompt);
  }

  const payload = await response.json();
  const imageBase64 =
    payload && payload.result && typeof payload.result.image === "string"
      ? payload.result.image
      : payload && typeof payload.image === "string"
        ? payload.image
        : "";

  if (!imageBase64) {
    throw new Error("Cloudflare Workers AI did not return an image.");
  }

  return {
    provider: "cloudflare",
    model: getCloudflareImageModel(),
    prompt: imagePrompt,
    mimeType: "image/jpeg",
    dataUrl: "data:image/jpeg;base64," + imageBase64,
  };
}

async function requestHuggingFaceImage(input, prompt) {
  const imagePrompt = buildHighQualityImagePrompt(input, prompt, 1600);
  const model = getHuggingFaceImageModel();
  const endpoint = process.env.HUGGINGFACE_IMAGE_ENDPOINT ||
    "https://api-inference.huggingface.co/models/" + encodeURIComponent(model);
  const response = await fetchWithTimeout(endpoint, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getHuggingFaceToken(),
      "Content-Type": "application/json",
      Accept: "image/png,image/jpeg,image/webp,application/json",
    },
    body: JSON.stringify({
      inputs: imagePrompt,
      parameters: {
        seed: getImageSeed(input),
        negative_prompt: IMAGE_TEXT_ARTIFACT_NEGATIVE_PROMPT,
        num_inference_steps: Math.max(4, Math.min(8, Number(process.env.HUGGINGFACE_IMAGE_STEPS || 8))),
      },
      options: {
        wait_for_model: true,
      },
    }),
  }, DEFAULT_IMAGE_PROVIDER_TIMEOUT_MS);

  if (!response.ok) {
    throw await buildHttpError(response, "Hugging Face image API failed");
  }

  const contentType = String(response.headers.get("content-type") || "");
  if (contentType.startsWith("application/json")) {
    const payload = await response.json();
    const base64 = extractBase64ImageFromPayload(payload);
    if (!base64) {
      throw new Error("Hugging Face did not return an image.");
    }
    return {
      provider: "huggingface",
      model: "huggingface/" + model,
      prompt: imagePrompt,
      mimeType: "image/png",
      dataUrl: "data:image/png;base64," + base64,
    };
  }

  return imageFromArrayBuffer("huggingface", "huggingface/" + model, contentType || "image/png", await response.arrayBuffer(), imagePrompt);
}

async function requestDashscopeQwenImage(input, prompt) {
  const imagePrompt = buildHighQualityImagePrompt(input, prompt, 1600);
  const endpoint = normalizeBaseUrl(process.env.DASHSCOPE_BASE_URL || DEFAULT_DASHSCOPE_BASE_URL) +
    "/services/aigc/multimodal-generation/generation";
  const response = await fetchWithTimeout(endpoint, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getDashscopeApiKey(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      model: getDashscopeImageModel(),
      input: {
        messages: [
          {
            role: "user",
            content: [{ text: imagePrompt }],
          },
        ],
      },
      parameters: {
        seed: getImageSeed(input),
        negative_prompt: IMAGE_TEXT_ARTIFACT_NEGATIVE_PROMPT,
      },
    }),
  }, DEFAULT_IMAGE_PROVIDER_TIMEOUT_MS);

  if (!response.ok) {
    throw await buildHttpError(response, "Qwen/DashScope image API failed");
  }

  const payload = await response.json();
  const imageUrl = extractImageUrlFromPayload(payload);
  const base64 = extractBase64ImageFromPayload(payload);

  if (base64) {
    return {
      provider: "qwen",
      model: "qwen/" + getDashscopeImageModel(),
      prompt: imagePrompt,
      mimeType: "image/png",
      dataUrl: "data:image/png;base64," + base64,
    };
  }

  if (!imageUrl) {
    throw new Error("Qwen/DashScope did not return an image URL.");
  }

  const imageResponse = await fetchWithTimeout(imageUrl, {
    method: "GET",
    headers: { Accept: "image/png,image/jpeg,image/webp,*/*" },
  }, DEFAULT_IMAGE_PROVIDER_TIMEOUT_MS);

  if (!imageResponse.ok) {
    throw await buildHttpError(imageResponse, "Qwen/DashScope image download failed");
  }

  const mimeType = String(imageResponse.headers.get("content-type") || "image/png").split(";")[0].trim();
  return imageFromArrayBuffer("qwen", "qwen/" + getDashscopeImageModel(), mimeType, await imageResponse.arrayBuffer(), imagePrompt);
}

async function requestPollinationsImage(input, prompt) {
  return enqueuePollinationsImageRequest(function () {
    return requestPollinationsImageNow(input, prompt);
  });
}

async function enqueuePollinationsImageRequest(task) {
  const previous = pollinationsRequestQueue.catch(function () {});
  const current = previous.then(task);
  pollinationsRequestQueue = current.catch(function () {});
  return current;
}

async function requestPollinationsImageNow(input, prompt) {
  const imagePrompt = buildPollinationsPrompt(input, prompt);
  const dimensions = getPollinationsImageDimensions(input && input.posterSettings && input.posterSettings.format);
  const seed = getImageSeed(input);
  const errors = [];

  for (const pollinationsModel of getPollinationsImageModels()) {
    const baseUrl = normalizeBaseUrl(process.env.POLLINATIONS_BASE_URL || DEFAULT_POLLINATIONS_BASE_URL);
    const url = new URL(getPollinationsImagePath(baseUrl, imagePrompt), baseUrl);
    url.searchParams.set("model", pollinationsModel);
    url.searchParams.set("width", String(dimensions.width));
    url.searchParams.set("height", String(dimensions.height));
    url.searchParams.set("seed", String(seed));
    url.searchParams.set("nologo", "true");
    url.searchParams.set("private", "true");
    url.searchParams.set("safe", "true");
    url.searchParams.set("negative", IMAGE_TEXT_ARTIFACT_NEGATIVE_PROMPT);
    if (pollinationsModel !== "turbo" && readBooleanEnv("POLLINATIONS_ENHANCE_PROMPT") === true) {
      url.searchParams.set("enhance", "true");
    }

    if (process.env.POLLINATIONS_API_KEY) {
      url.searchParams.set("key", process.env.POLLINATIONS_API_KEY);
    }

    const maxAttempts = Math.max(getPollinationsRetryAttempts(), getPollinationsQueueRetryAttempts());
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const response = await fetchWithTimeout(url, {
          method: "GET",
          headers: {
            Accept: "image/png,image/jpeg,image/webp,*/*",
            "User-Agent": "shtunda13-post-maker/" + APP_VERSION,
          },
        }, DEFAULT_POLLINATIONS_TIMEOUT_MS);

        if (!response.ok) {
          throw await buildHttpError(response, "Pollinations image API failed");
        }

        const mimeType = String(response.headers.get("content-type") || "image/jpeg").split(";")[0].trim();
        if (!mimeType.startsWith("image/")) {
          throw new Error("Pollinations did not return an image.");
        }

        return imageFromArrayBuffer("pollinations", "pollinations/" + pollinationsModel, mimeType, await response.arrayBuffer(), imagePrompt);
      } catch (error) {
        errors.push(error);
        const queueFull = isPollinationsQueueFullError(error);
        const retryLimit = queueFull ? getPollinationsQueueRetryAttempts() : getPollinationsRetryAttempts();
        if (attempt < retryLimit && isTemporaryProviderBackoffError(error)) {
          await delay(queueFull ? getPollinationsQueueRetryDelayMs() : getPollinationsRetryDelayMs() * attempt);
          continue;
        }
        break;
      }
    }
  }

  throw combineProviderErrors(errors);
}

function getPollinationsRetryAttempts() {
  const attempts = Number(DEFAULT_POLLINATIONS_RETRY_ATTEMPTS);
  return Number.isFinite(attempts) ? Math.max(1, Math.min(5, Math.floor(attempts))) : 3;
}

function getPollinationsRetryDelayMs() {
  const delayMs = Number(DEFAULT_POLLINATIONS_RETRY_DELAY_MS);
  return Number.isFinite(delayMs) ? Math.max(1000, Math.min(20000, Math.floor(delayMs))) : 4500;
}

function getPollinationsQueueRetryAttempts() {
  const attempts = Number(DEFAULT_POLLINATIONS_QUEUE_RETRY_ATTEMPTS);
  return Number.isFinite(attempts) ? Math.max(1, Math.min(10, Math.floor(attempts))) : 7;
}

function getPollinationsQueueRetryDelayMs() {
  const delayMs = Number(DEFAULT_POLLINATIONS_QUEUE_RETRY_DELAY_MS);
  return Number.isFinite(delayMs) ? Math.max(3000, Math.min(20000, Math.floor(delayMs))) : 9000;
}

function normalizeBaseUrl(value) {
  return String(value || DEFAULT_POLLINATIONS_BASE_URL).replace(/\/+$/u, "");
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(function () {
    controller.abort();
  }, Math.max(8000, Number(timeoutMs || DEFAULT_IMAGE_PROVIDER_TIMEOUT_MS)));

  try {
    return await fetch(url, Object.assign({}, options || {}, {
      signal: controller.signal,
    }));
  } catch (error) {
    throw new Error(
      error && error.name === "AbortError"
        ? "Image provider request timed out."
        : error && error.message
          ? error.message
          : "Image provider request failed."
    );
  } finally {
    clearTimeout(timeout);
  }
}

async function buildHttpError(response, fallbackMessage) {
  let detail = "";
  try {
    const contentType = String(response.headers.get("content-type") || "");
    if (contentType.includes("application/json")) {
      const payload = await response.json();
      detail =
        cleanText(payload && payload.error && payload.error.message) ||
        cleanText(payload && payload.message) ||
        cleanText(payload && payload.msg) ||
        JSON.stringify(payload).slice(0, 260);
    } else {
      detail = cleanText(await response.text());
    }
  } catch {
    detail = "";
  }

  const error = new Error((fallbackMessage || "Image provider failed") + " HTTP " + response.status + (detail ? ": " + shortenText(detail, 260) : "."));
  error.statusCode = response.status;
  throw error;
}

function imageFromArrayBuffer(provider, model, mimeType, arrayBuffer, prompt) {
  const cleanMimeType = String(mimeType || "image/png").split(";")[0].trim();
  const buffer = Buffer.from(arrayBuffer);
  if (!buffer.length) {
    throw new Error(provider + " returned an empty image.");
  }
  if (buffer.length > 18_000_000) {
    throw new Error(provider + " image is too large.");
  }
  return {
    provider: provider,
    model: model,
    prompt: prompt,
    mimeType: cleanMimeType.startsWith("image/") ? cleanMimeType : "image/png",
    dataUrl: "data:" + (cleanMimeType.startsWith("image/") ? cleanMimeType : "image/png") + ";base64," + buffer.toString("base64"),
  };
}

function extractBase64ImageFromPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  if (typeof payload.image === "string") return stripDataUrl(payload.image);
  if (typeof payload.b64_json === "string") return stripDataUrl(payload.b64_json);
  if (payload.result && typeof payload.result.image === "string") return stripDataUrl(payload.result.image);

  const output = payload.output || payload.data || payload.results || payload.images || payload.choices;
  const queue = Array.isArray(output) ? output.slice() : output && typeof output === "object" ? [output] : [];

  while (queue.length) {
    const item = queue.shift();
    if (!item || typeof item !== "object") continue;
    if (typeof item.image === "string" && isLikelyBase64Image(item.image)) return stripDataUrl(item.image);
    if (typeof item.b64_json === "string") return stripDataUrl(item.b64_json);
    if (Array.isArray(item.content)) queue.push.apply(queue, item.content);
    if (item.message && typeof item.message === "object") queue.push(item.message);
  }

  return "";
}

function extractImageUrlFromPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  if (typeof payload.url === "string" && /^https?:\/\//u.test(payload.url)) return payload.url;
  if (typeof payload.image_url === "string" && /^https?:\/\//u.test(payload.image_url)) return payload.image_url;

  const output = payload.output || payload.data || payload.results || payload.images || payload.choices;
  const queue = Array.isArray(output) ? output.slice() : output && typeof output === "object" ? [output] : [];

  while (queue.length) {
    const item = queue.shift();
    if (!item || typeof item !== "object") continue;
    if (typeof item.url === "string" && /^https?:\/\//u.test(item.url)) return item.url;
    if (typeof item.image_url === "string" && /^https?:\/\//u.test(item.image_url)) return item.image_url;
    if (typeof item.image === "string" && /^https?:\/\//u.test(item.image)) return item.image;
    if (Array.isArray(item.content)) queue.push.apply(queue, item.content);
    if (item.message && typeof item.message === "object") queue.push(item.message);
  }

  return "";
}

function stripDataUrl(value) {
  return String(value || "").replace(/^data:image\/[a-z0-9.+-]+;base64,/iu, "");
}

function isLikelyBase64Image(value) {
  return /^data:image\//iu.test(value) || /^[A-Za-z0-9+/=]{120,}$/u.test(value);
}

function getPollinationsImagePath(baseUrl, prompt) {
  const encodedPrompt = encodeURIComponent(prompt);
  return String(baseUrl || "").includes("image.pollinations.ai")
    ? "/prompt/" + encodedPrompt
    : "/image/" + encodedPrompt;
}

function buildHighQualityImagePrompt(input, prompt, maxLength) {
  const settings = input && input.posterSettings ? input.posterSettings : {};
  const topic = cleanText(input && input.topic);
  const verseFocus = cleanText(input && input.verseFocus);
  const tags = Array.isArray(input && input.tags) ? input.tags.map(cleanText).filter(Boolean) : [];
  const subject = String(settings.subject || "landscape");
  const visualStyleId = String(settings.visualStyle || "natural");
  const formatId = String(settings.format || "portrait_4_5");
  const layoutPrompt = diffusionLayoutGuides[String(settings.layout || "top")] || diffusionLayoutGuides.top;
  const subjectSafety = buildDiffusionSubjectGuidance(subject);
  const profile = selectMoodProfile(topic, verseFocus, tags);
  const seed = getImageSeed(input);
  const scene = sanitizeDiffusionPromptSegment(pickSubjectScene(subject, profile, seed + 13));
  const lighting = pickBySeed(profile.lightings, seed + 23);
  const palette = pickBySeed(profile.palettes, seed + 31);
  const artStyle = sanitizeDiffusionPromptSegment(posterVisualStyleGuides[visualStyleId] || posterVisualStyleGuides.natural);

  return shortenText([
    "High-quality atmospheric environmental image, pure visual scene only.",
    "Scene: " + scene + ".",
    "Dominant subject: " + subject + ".",
    "Mood: " + sanitizeDiffusionPromptSegment(profile.moods.join(", ")) + ".",
    "Visual style: " + visualStyleId + ". Style guide: " + artStyle + ".",
    "Crop: " + (diffusionFormatGuides[formatId] || diffusionFormatGuides.portrait_4_5) + ".",
    "Lighting: " + lighting + ".",
    "Palette: " + palette + ".",
    "Composition: realistic environmental depth, strong natural focal hierarchy, coherent full-frame detail; " + layoutPrompt + ".",
    "Quality: sharp, crisp, clear, cinematic, richly detailed, professional, polished, non-generic, high resolution, natural surfaces, not a simple gradient-only backdrop.",
    "Sharpness: clean edge-to-edge detail, no blank panels, no duplicated-image frames, no low-detail center, no artificial wash.",
    "Subject handling: " + subjectSafety + ".",
    "Different variant cue: " + pickBySeed(variationPool, seed + 41) + ".",
  ].filter(Boolean).join(" "), maxLength || 1800);
}

function buildPollinationsPrompt(input, prompt) {
  return buildHighQualityImagePrompt(input, prompt, 1200);
}

function sanitizeDiffusionPromptSegment(value) {
  return cleanText(value)
    .replace(/\b(text|typography|letters?|words?|numbers?|glyphs?|caption|title|subtitle|scripture|verse|reference|logo|watermark|signature|stamp|seal|badge|cross|poster|flyer|signage|signs?|label|paper|page|screen|website|ui)\b/giu, "natural visual detail")
    .replace(/\b(quote card|book cover|album cover|religious symbol)\b/giu, "natural visual detail")
    .replace(/\s+/gu, " ")
    .trim();
}

function buildDiffusionSubjectGuidance(subject) {
  const peopleSubjects = new Set(["people", "couple"]);
  const citySubjects = new Set(["city", "old_town", "street", "architecture", "interior"]);
  const abstractSubjects = new Set(["abstract", "texture"]);

  if (peopleSubjects.has(subject)) {
    return "anonymous distant figures, tasteful posture, calm environment, uncluttered frame";
  }

  if (citySubjects.has(subject)) {
    return "elegant uncluttered architecture, refined atmosphere, clean surfaces";
  }

  if (abstractSubjects.has(subject)) {
    return "atmospheric shapes, soft light, refined texture, balanced visual rhythm";
  }

  return "natural calm environment, uncluttered foreground, balanced depth";
}

function getPollinationsImageDimensions(formatId) {
  const formats = {
    portrait_4_5: { width: 1024, height: 1280 },
    story_9_16: { width: 720, height: 1280 },
    square_1_1: { width: 1280, height: 1280 },
    landscape_16_9: { width: 1280, height: 720 },
    facebook_link_1200_630: { width: 1200, height: 630 },
    pinterest_2_3: { width: 853, height: 1280 },
  };

  return formats[String(formatId || "")] || formats.portrait_4_5;
}

function getImageSeed(input) {
  const settings = input && input.posterSettings ? input.posterSettings : {};
  return Math.abs(hashString([
    cleanText(input && input.topic),
    cleanText(input && input.reference),
    cleanText(input && input.verseText),
    cleanText(input && input.verseFocus),
    String(settings.subject || "landscape"),
    String(settings.visualStyle || "natural"),
    String(settings.format || "portrait_4_5"),
    String(input && input.variant ? input.variant : 0),
  ].join("|"))) % 2147483647;
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

function parseJsonPayload(rawText) {
  try {
    return JSON.parse(rawText);
  } catch {
    const fencedMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/iu);
    if (fencedMatch) {
      return JSON.parse(fencedMatch[1].trim());
    }

    const jsonMatch = rawText.match(/\{[\s\S]*\}/u);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error("AI-модель вернула текст в неожиданном формате.");
  }
}

function extractGroundingMetadata(payload) {
  const candidates = Array.isArray(payload && payload.candidates) ? payload.candidates : [];
  const candidate = candidates[0] || {};
  return candidate.groundingMetadata || candidate.grounding_metadata || null;
}

function extractGroundingSources(metadata) {
  const chunks = Array.isArray(metadata && metadata.groundingChunks)
    ? metadata.groundingChunks
    : Array.isArray(metadata && metadata.grounding_chunks)
      ? metadata.grounding_chunks
      : [];
  const seen = new Set();
  const sources = [];

  chunks.forEach(function (chunk) {
    const web = chunk && chunk.web ? chunk.web : {};
    const uri = cleanText(web.uri || web.url);
    const title = cleanText(web.title || uri);
    const key = uri || title;

    if (!key || seen.has(key)) {
      return;
    }

    seen.add(key);
    sources.push({
      title: shortenText(title, 96),
      url: uri,
    });
  });

  return sources.slice(0, 6);
}

function extractGroundingQueries(metadata) {
  const queries = Array.isArray(metadata && metadata.webSearchQueries)
    ? metadata.webSearchQueries
    : Array.isArray(metadata && metadata.web_search_queries)
      ? metadata.web_search_queries
      : [];

  return queries.map(cleanText).filter(Boolean).slice(0, 6);
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
  const subjectSafety = buildSubjectSafetyGuidance(subject);
  const hasReferenceImage = Boolean(input.referenceImage && input.referenceImage.data);

  return [
    "Create a clean high-quality wordless background image only.",
    "Image format: " + formatPrompt + ".",
    "Generate only the background scene; the image itself must stay completely free of lettering, numbers, symbols, logos, marks, and writing.",
    "Do not create a finished poster, quote card, book cover, flyer, title card, album cover, devotional graphic, social media template, website, UI screen, label, sign, page, paper sheet, emblem, seal, badge, cross, or logo.",
    "Absolute ban: no readable letters, no unreadable pseudo-letters, no numbers, no glyphs, no caption-like marks, no scripture references, no verse fragments, no monograms, no signage, no watermarks, no signatures, no faux-typography textures.",
    'Theme mood only, do not render as words: "' + topic + '".',
    'Spiritual mood anchor only, not visible text: "' + shortenText(verseFocus || postText, 180) + '".',
    "Post tone: " + (postStyleGuides[postStyle] || postStyleGuides.inspiring) + ".",
    "Visual direction: " + scene + ".",
    "Visual style: " + artStyle + ".",
    "Subject-style lock: the selected subject must dominate the actual scene, and the selected visual style must change composition, materials, color behavior, camera language, and texture, not merely add a filter.",
    "Style contrast requirement: make this look unmistakably like the selected visual style when compared against natural/editorial/cinematic/minimalist/painterly/vintage/dreamy/modernist/postmodern/glitch/luxury/analog alternatives.",
    "The chosen style should change the image language at the concept level, including geometry, surface treatment, depth, and lighting behavior.",
    "Do not default back to a pastoral landscape when the selected subject is city, architecture, interior, people, abstract, texture, night, or street.",
    "Lighting: " + lighting + ".",
    "Color palette: " + palette + ".",
    "Mood: " + mood + ".",
    "Composition: " + composition + ".",
    "Quality bar: professional editorial background, high-resolution, layered foreground/midground/background depth, intentional focal hierarchy, rich but restrained detail, natural light behavior, sharp crisp clear surfaces, no low-effort gradient-only backdrop, no AI text artifacts.",
    "Layout guidance: " + layoutPrompt + ".",
    hasReferenceImage
      ? "A user reference image is attached. Use it as inspiration for composition, atmosphere, palette, and visual motifs while still creating a fresh original background for this verse. Do not copy any text, logos, watermarks, or brand elements from the reference."
      : "No reference image is attached, so derive the visual completely from the prompt itself.",
    "Variation cue: " + variation + ".",
    "Make this generation visibly different from prior variants by changing camera distance, scene structure, focal plane, and atmospheric treatment while keeping the scene natural across the full frame.",
    "Use imagery that faithfully matches the selected subject and feels calm, reverent, and complete as a clean background without containing religious symbols or writing.",
    "Subject guardrails: " + subjectSafety + ".",
    "Negative prompt: " + IMAGE_TEXT_ARTIFACT_NEGATIVE_PROMPT + ".",
    "Do not reserve or paint any special blank panel, center wash, or artificial rectangular zone; generate a complete scene with natural detail throughout.",
    "The result should feel peaceful, reverent, emotionally aligned with the post, and beautiful without looking generic.",
  ].join(" ");
}

function buildFallbackBackgroundImage(input, prompt, error) {
  const settings = input && input.posterSettings ? input.posterSettings : {};
  const format = getFallbackImageFormat(String(settings.format || "portrait_4_5"));
  const subject = String(settings.subject || "landscape");
  const visualStyle = String(settings.visualStyle || "natural");
  const variant = Number.isFinite(Number(input && input.variant)) ? Number(input.variant) : 0;
  const seed = Math.abs(hashString([
    cleanText(input && input.topic),
    cleanText(input && input.reference),
    subject,
    visualStyle,
    String(variant),
  ].join("|")));
  const palette = getFallbackImagePalette(subject, visualStyle, seed);
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + format.width + '" height="' + format.height + '" viewBox="0 0 ' + format.width + ' ' + format.height + '">',
    "<defs>",
    '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">',
    '<stop offset="0%" stop-color="' + palette.top + '"/>',
    '<stop offset="52%" stop-color="' + palette.mid + '"/>',
    '<stop offset="100%" stop-color="' + palette.bottom + '"/>',
    "</linearGradient>",
    '<radialGradient id="glow" cx="' + (seed % 70 + 15) + '%" cy="' + (seed % 42 + 10) + '%" r="62%">',
    '<stop offset="0%" stop-color="' + palette.glow + '" stop-opacity="0.62"/>',
    '<stop offset="100%" stop-color="' + palette.glow + '" stop-opacity="0"/>',
    "</radialGradient>",
    "</defs>",
    '<rect width="100%" height="100%" fill="url(#bg)"/>',
    '<rect width="100%" height="100%" fill="url(#glow)"/>',
    buildFallbackSubjectSvg(subject, visualStyle, format, palette, seed),
    '<rect width="100%" height="100%" fill="' + palette.veil + '" opacity="0.18"/>',
    "</svg>",
  ].join("");

  return {
    provider: "local-fallback",
    model: "local-svg-background",
    prompt: prompt,
    mimeType: "image/svg+xml",
    dataUrl: "data:image/svg+xml;base64," + Buffer.from(svg, "utf8").toString("base64"),
    warning: error && error.message ? error.message : "Gemini image generation unavailable.",
  };
}

function getFallbackImageFormat(formatId) {
  const formats = {
    portrait_4_5: { width: 1080, height: 1350 },
    story_9_16: { width: 1080, height: 1920 },
    square_1_1: { width: 1080, height: 1080 },
    landscape_16_9: { width: 1920, height: 1080 },
    facebook_link_1200_630: { width: 1200, height: 630 },
    pinterest_2_3: { width: 1000, height: 1500 },
  };

  return formats[formatId] || formats.portrait_4_5;
}

function getFallbackImagePalette(subject, visualStyle, seed) {
  const stylePalettes = {
    glitch: ["#121826", "#243b67", "#03d5ff", "#ff4fd8", "rgba(255,255,255,0.06)"],
    painterly: ["#2f3f38", "#7b8c61", "#d9c29a", "#fff0c9", "rgba(255,247,222,0.16)"],
    vintage_film: ["#42372f", "#8e7359", "#d4ad72", "#ffe0a3", "rgba(70,45,20,0.12)"],
    modernism: ["#203047", "#e2d6bd", "#d4513c", "#f6e7c8", "rgba(255,255,255,0.18)"],
    postmodern: ["#17213a", "#58508d", "#ffb000", "#ff6361", "rgba(255,255,255,0.14)"],
    luxury: ["#16191f", "#26332c", "#c9a968", "#fff1c8", "rgba(255,245,210,0.12)"],
    analog: ["#303b35", "#8d9272", "#c7b99a", "#f6e8ce", "rgba(80,55,30,0.12)"],
    minimalist: ["#d9e3df", "#f4eee3", "#9ab7b0", "#ffffff", "rgba(255,255,255,0.28)"],
    cinematic: ["#132033", "#36526c", "#d59d59", "#ffe0a0", "rgba(10,20,35,0.10)"],
    dreamy: ["#c9d7ec", "#dfcce8", "#f6dfd1", "#ffffff", "rgba(255,255,255,0.26)"],
  };
  const subjectPalettes = {
    city: ["#182333", "#33485e", "#9fb9c8", "#f0d09a", "rgba(8,16,28,0.12)"],
    sea: ["#123245", "#2f7185", "#b6e0d8", "#fff3d6", "rgba(255,255,255,0.14)"],
    forest: ["#183326", "#476b48", "#9caf7b", "#f6e8c8", "rgba(12,35,22,0.12)"],
    mountains: ["#223047", "#5d7188", "#c4c9c7", "#fff0c8", "rgba(20,35,55,0.10)"],
    abstract: ["#20223b", "#5d6db4", "#d9a7c7", "#fff2cc", "rgba(255,255,255,0.16)"],
    texture: ["#4b4338", "#a18f75", "#dac9aa", "#fff3d8", "rgba(88,55,20,0.10)"],
    night: ["#090f1e", "#1d3152", "#5577a8", "#d6e9ff", "rgba(0,0,0,0.18)"],
  };
  const selected = stylePalettes[visualStyle] || subjectPalettes[subject] || ["#24344a", "#6c8e8a", "#d8c69a", "#fff0c8", "rgba(255,255,255,0.14)"];
  const shift = seed % selected.length;
  const rotated = selected.slice(shift).concat(selected.slice(0, shift));

  return {
    top: rotated[0],
    mid: rotated[1],
    bottom: rotated[2],
    glow: rotated[3],
    veil: rotated[4] || "rgba(255,255,255,0.12)",
  };
}

function buildFallbackSubjectSvg(subject, visualStyle, format, palette, seed) {
  const width = format.width;
  const height = format.height;
  const horizon = Math.round(height * (0.56 + (seed % 12) / 100));
  const accent = visualStyle === "glitch" || visualStyle === "postmodern" || visualStyle === "modernism";
  const opacity = accent ? "0.42" : "0.28";
  const shapes = [];

  if (subject === "city" || subject === "street" || subject === "architecture" || subject === "old_town") {
    for (let index = 0; index < 14; index += 1) {
      const buildingWidth = Math.round(width * (0.045 + ((seed + index) % 5) / 260));
      const x = Math.round((width / 14) * index - buildingWidth * 0.2);
      const buildingHeight = Math.round(height * (0.12 + ((seed + index * 7) % 18) / 100));
      shapes.push('<rect x="' + x + '" y="' + (horizon - buildingHeight) + '" width="' + buildingWidth + '" height="' + buildingHeight + '" fill="' + palette.top + '" opacity="0.36"/>');
    }
    shapes.push('<rect x="0" y="' + horizon + '" width="' + width + '" height="' + Math.round(height * 0.16) + '" fill="' + palette.bottom + '" opacity="0.2"/>');
  } else if (subject === "sea" || subject === "lake" || subject === "river" || subject === "rain") {
    for (let index = 0; index < 5; index += 1) {
      const y = Math.round(horizon + index * height * 0.06);
      shapes.push('<path d="M0 ' + y + ' C ' + width * 0.25 + ' ' + (y - 34) + ', ' + width * 0.62 + ' ' + (y + 36) + ', ' + width + ' ' + (y - 8) + ' L ' + width + ' ' + (y + 58) + ' C ' + width * 0.64 + ' ' + (y + 86) + ', ' + width * 0.22 + ' ' + (y + 28) + ', 0 ' + (y + 70) + ' Z" fill="' + palette.mid + '" opacity="' + (0.18 + index * 0.035).toFixed(2) + '"/>');
    }
  } else if (subject === "abstract" || subject === "texture" || accent) {
    for (let index = 0; index < 12; index += 1) {
      const x = Math.round(((seed + index * 83) % width) - width * 0.12);
      const y = Math.round(((seed + index * 137) % height) - height * 0.08);
      const size = Math.round(width * (0.12 + ((seed + index) % 8) / 100));
      shapes.push('<rect x="' + x + '" y="' + y + '" width="' + size + '" height="' + Math.round(size * 0.36) + '" rx="' + Math.round(size * 0.04) + '" fill="' + (index % 2 ? palette.glow : palette.mid) + '" opacity="' + opacity + '" transform="rotate(' + (((seed + index * 17) % 50) - 25) + ' ' + x + ' ' + y + ')"/>');
    }
  } else {
    shapes.push('<path d="M0 ' + horizon + ' C ' + width * 0.24 + ' ' + (horizon - height * 0.12) + ', ' + width * 0.42 + ' ' + (horizon + height * 0.08) + ', ' + width + ' ' + (horizon - height * 0.08) + ' L ' + width + ' ' + height + ' L 0 ' + height + ' Z" fill="' + palette.mid + '" opacity="0.34"/>');
    shapes.push('<path d="M0 ' + Math.round(horizon + height * 0.12) + ' C ' + width * 0.28 + ' ' + (horizon + height * 0.03) + ', ' + width * 0.56 + ' ' + (horizon + height * 0.18) + ', ' + width + ' ' + (horizon + height * 0.06) + ' L ' + width + ' ' + height + ' L 0 ' + height + ' Z" fill="' + palette.top + '" opacity="0.18"/>');
  }

  return shapes.join("");
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
  const variant = Number.isFinite(Number(input.variant)) ? Number(input.variant) : 0;
  const topicLens = buildTopicLens(topic, tags);
  const allowEmojis = Boolean(input.allowEmojis);
  const variantAngle = pickBySeed(postVariantAngles, hashString([topic, reference, style, String(variant)].join("|")));

  return [
    "You are a Protestant evangelical content editor writing short theological social posts.",
    "Write only in " + languageMeta[language].name + ".",
    "Base the post carefully on the given Bible verse and topic.",
    "The theology must be recognizably Protestant: Scripture-first, Christ-centered, grace-centered, calling for repentance, faith, holiness, and obedience as fruit of grace.",
    "Do not sound sacramentalist, prosperity-focused, manipulative, universalist, or works-righteous.",
    "The tone style must be: " + (postStyleGuides[style] || postStyleGuides.inspiring) + ".",
    "Storytelling shape for this style: " + (storytellingGuides[style] || storytellingGuides.inspiring) + ".",
    "Style differentiation requirement: " + (postStyleDifferentiators[style] || postStyleDifferentiators.inspiring),
    "Regeneration variant #" + String(variant) + ": " + variantAngle,
    "If the user changes style, the post must change structure, rhythm, opening, application, and call to action, not just word choice.",
    "If this is a regeneration, produce a meaningfully new draft while keeping the same topic and verse.",
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

  return [
    "You are a Protestant biblical research editor for a Christian social post app.",
    "Write only in " + languageMeta[language].name + ".",
    "Your task is to research the whole Protestant Bible canon of 66 books and suggest up to 8 Bible passages for the exact user topic.",
    "When web search is available, use it to ground the topic from trustworthy Protestant evangelical sources before selecting passages.",
    "Prefer sources such as Ligonier, Desiring God, The Gospel Coalition, 9Marks, Crossway, BibleProject, GotQuestions, and relevant local-language evangelical Protestant resources.",
    "Avoid Catholic, Orthodox, Mormon, Jehovah's Witnesses, prosperity-gospel, occult, or generic self-help sources as theological grounding.",
    "Do not copy article wording. Synthesize the topic from scratch and then choose Bible passages.",
    "Do not use a fixed favorite list. Do not default to marriage, relationships, covenant, dating, family, or gender themes unless the topic explicitly asks for them.",
    "Stay inside the semantic boundaries of the topic. Do not broaden the topic into a different pastoral issue.",
    matchMode === "explicit"
      ? "Selection mode is explicit: prioritize verses that directly and clearly speak about the stated topic."
      : "Selection mode is implicit: prioritize verses that illuminate the deeper root issue, motives, wisdom, heart condition, repentance, covenant, hope, or discipleship beneath the topic.",
    "Use Protestant theological judgment: Scripture interprets Scripture, gospel-centered application, sin and grace, repentance, faith, sanctification, obedience, hope in Christ.",
    "Do not force weak matches. Prefer theological accuracy, canonical context, and clear relevance over cleverness.",
    "Use diverse Bible books when appropriate. Avoid repeating the same passages across unrelated topics.",
    "Each suggestion must include a canonical reference, the verse text in the target language, concise tags, a theological focus, and a user-facing rationale.",
    "If exact translation wording is uncertain, use a faithful traditional-style rendering rather than inventing a modern paraphrase.",
    "Do not fabricate references. Do not merge unrelated passages into one quote.",
    'Topic: "' + topic + '".',
    "Return strict JSON only with keys: topicResearch, suggestions.",
    "topicResearch must be an object with keys: summary, protestantAngle, cautions.",
    "topicResearch.summary must summarize the specific user topic in one sentence.",
    "topicResearch.protestantAngle must state the Protestant evangelical angle in one sentence.",
    "topicResearch.cautions must be an array of 2 to 4 short boundaries to avoid weak or unsafe interpretation.",
    "suggestions must be an array of objects with keys: reference, text, tags, focus, rationale.",
    "reference must include book, chapter, and verse range.",
    "text must be the verse text, 1 to 4 verses maximum.",
    "tags must contain 3 to 5 short topic tags in the target language.",
    "focus must explain the theological angle in one concise sentence.",
    "rationale must be 8 to 22 words long and explain why this passage fits this exact topic.",
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

function normalizeSuggestedScriptures(generated, input) {
  const language = resolveLanguage(input && input.language);
  const suggestions = Array.isArray(generated && generated.suggestions) ? generated.suggestions : [];
  const normalizedSuggestions = [];
  const ids = [];
  const reasons = {};
  const seen = new Set();
  const rawResearch = generated && generated.topicResearch && typeof generated.topicResearch === "object"
    ? generated.topicResearch
    : {};

  suggestions.forEach(function (entry, index) {
    if (!entry || typeof entry !== "object") {
      return;
    }

    const reference = shortenText(
      normalizeScriptureReference(entry.reference || entry.ref || entry.passage || entry.citation),
      90
    );
    const text = shortenText(
      normalizeScriptureText(entry.text || entry.verseText || entry.quote || entry.scripture),
      520
    );

    if (!isValidScriptureReference(reference) || !text) {
      return;
    }

    const seenKey = normalize(reference);
    if (seen.has(seenKey)) {
      return;
    }

    const id = buildGeneratedScriptureId(entry.id, reference, index);
    const tags = Array.isArray(entry.tags)
      ? entry.tags.map(cleanText).filter(Boolean).slice(0, 5)
      : [];
    const rationale = cleanText(entry.rationale || entry.reason || entry.why);
    const focus = shortenText(
      cleanText(entry.focus || entry.theologicalFocus || entry.application) ||
        rationale ||
        getScriptureFallbackFocus(language),
      280
    );

    seen.add(seenKey);
    ids.push(id);
    if (rationale) {
      reasons[id] = shortenText(rationale, 160);
    }

    normalizedSuggestions.push({
      id: id,
      reference: reference,
      text: text,
      tags: tags.length ? tags : getScriptureFallbackTags(language),
      focus: focus,
    });
  });

  return {
    suggestions: normalizedSuggestions.slice(0, 8),
    ids: ids.slice(0, 8),
    reasons: reasons,
    topicResearch: {
      summary: shortenText(cleanText(rawResearch.summary), 220),
      protestantAngle: shortenText(cleanText(rawResearch.protestantAngle), 220),
      cautions: Array.isArray(rawResearch.cautions)
        ? rawResearch.cautions.map(cleanText).filter(Boolean).slice(0, 4)
        : [],
    },
  };
}

function normalizeScriptureReference(value) {
  const direct = cleanScalarText(value);
  if (isValidScriptureReference(direct)) {
    return direct;
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  const nested = value.reference || value.ref || value.passage || value.citation;
  if (nested && nested !== value) {
    const nestedReference = normalizeScriptureReference(nested);
    if (nestedReference) {
      return nestedReference;
    }
  }

  const start = value.start || value.from || {};
  const end = value.end || value.to || {};
  const book = cleanScalarText(
    value.book ||
      value.bookName ||
      value.book_name ||
      value.canonicalBook ||
      value.name ||
      start.book ||
      start.bookName
  );
  const chapter = normalizeReferencePart(value.chapter || value.chapterNumber || start.chapter || start.chapterNumber);
  const verse = normalizeReferencePart(
    value.verse ||
      value.verses ||
      value.verseRange ||
      value.verse_range ||
      value.startVerse ||
      start.verse ||
      start.verses ||
      start.verseNumber
  );
  const endChapter = normalizeReferencePart(value.endChapter || end.chapter || end.chapterNumber);
  const endVerse = normalizeReferencePart(value.endVerse || end.verse || end.verses || end.verseNumber);

  if (!book || !chapter || !verse) {
    return "";
  }

  if (endVerse && endChapter && endChapter !== chapter) {
    return book + " " + chapter + ":" + verse + "-" + endChapter + ":" + endVerse;
  }

  if (endVerse && !String(verse).includes("-")) {
    return book + " " + chapter + ":" + verse + "-" + endVerse;
  }

  return book + " " + chapter + ":" + verse;
}

function normalizeScriptureText(value) {
  const direct = cleanScalarText(value);
  if (direct) {
    return direct;
  }

  if (Array.isArray(value)) {
    return cleanText(value.map(normalizeScriptureText).filter(Boolean).join(" "));
  }

  if (value && typeof value === "object") {
    return cleanScalarText(value.text || value.verseText || value.quote || value.scripture || value.content);
  }

  return "";
}

function normalizeReferencePart(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeReferencePart).filter(Boolean).join("-");
  }

  if (value && typeof value === "object") {
    const start = normalizeReferencePart(value.start || value.from || value.first);
    const end = normalizeReferencePart(value.end || value.to || value.last);
    if (start && end && start !== end) {
      return start + "-" + end;
    }
    return start || end || normalizeReferencePart(value.number || value.value);
  }

  return cleanScalarText(value).replace(/\s+/gu, "");
}

function cleanScalarText(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string" || typeof value === "number") {
    return cleanText(value);
  }

  return "";
}

function isValidScriptureReference(reference) {
  const normalized = cleanText(reference);
  return Boolean(normalized) &&
    !/\[object object\]/iu.test(normalized) &&
    !/\b(undefined|null|nan)\b/iu.test(normalized) &&
    /\p{L}/u.test(normalized) &&
    /\d/u.test(normalized);
}

function buildGeneratedScriptureId(rawId, reference, index) {
  const explicitId = cleanText(rawId)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
  const referenceSlug = cleanText(reference)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
  const base = explicitId || referenceSlug || "scripture-" + String(index + 1);
  const suffix = Math.abs(hashString(reference + ":" + index)).toString(36);

  return "ai-" + base.slice(0, 48) + "-" + suffix;
}

function getScriptureFallbackFocus(language) {
  const labels = {
    ru: "Этот текст помогает раскрыть тему в свете Божьей истины, покаяния, веры и послушания Христу.",
    uk: "Цей текст допомагає розкрити тему у світлі Божої істини, покаяння, віри й послуху Христу.",
    pl: "Ten tekst pomaga ukazać temat w świetle Bożej prawdy, pokuty, wiary i posłuszeństwa Chrystusowi.",
    tr: "Bu metin konuyu Tanrı'nın gerçeği, tövbe, iman ve Mesih'e itaat ışığında açar.",
  };

  return labels[language] || labels.ru;
}

function getScriptureFallbackTags(language) {
  const labels = {
    ru: ["вера", "покаяние", "послушание"],
    uk: ["віра", "покаяння", "послух"],
    pl: ["wiara", "pokuta", "posłuszeństwo"],
    tr: ["iman", "tövbe", "itaat"],
  };

  return labels[language] || labels.ru;
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
      "a serene mountain valley with clear morning air",
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
    "Create a coherent full-frame background compatible with " +
    (typographyGuides[typography] || typographyGuides.noto_serif) +
    ", with foreground lettering opacity around " +
    textOpacity +
    "%, and outline strength around " +
    strokeStrength +
    "%. The image itself must contain no rendered letters, writing, blank panel, or low-detail clarity patch."
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

function readPackageVersion(filePath) {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return cleanText(parsed && parsed.version);
  } catch {
    return "";
  }
}

function getImageModel() {
  return process.env.GEMINI_IMAGE_MODEL || DEFAULT_IMAGE_MODEL;
}

function getPollinationsImageModel() {
  return process.env.POLLINATIONS_IMAGE_MODEL || DEFAULT_POLLINATIONS_IMAGE_MODEL;
}

function getPollinationsImageModels() {
  const models = splitModelList(process.env.POLLINATIONS_IMAGE_MODEL || DEFAULT_POLLINATIONS_IMAGE_MODEL);
  return Array.from(new Set(models.concat(["turbo"]).map(cleanText).filter(Boolean)));
}

function getCloudflareImageModel() {
  return process.env.CLOUDFLARE_IMAGE_MODEL || DEFAULT_CLOUDFLARE_IMAGE_MODEL;
}

function getHuggingFaceImageModel() {
  return process.env.HUGGINGFACE_IMAGE_MODEL || DEFAULT_HUGGINGFACE_IMAGE_MODEL;
}

function getDashscopeImageModel() {
  return process.env.DASHSCOPE_IMAGE_MODEL || DEFAULT_DASHSCOPE_IMAGE_MODEL;
}

function getHuggingFaceToken() {
  return process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || "";
}

function getDashscopeApiKey() {
  return process.env.DASHSCOPE_API_KEY || process.env.QWEN_API_KEY || "";
}

function getImageProviderOrder() {
  return splitModelList(process.env.AI_IMAGE_PROVIDER_ORDER || DEFAULT_IMAGE_PROVIDER_ORDER);
}

function isGeminiImageProviderAvailable() {
  return Boolean(process.env.GEMINI_API_KEY);
}

function isCloudflareImageProviderAvailable() {
  return Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN);
}

function isHuggingFaceImageProviderAvailable() {
  return Boolean(getHuggingFaceToken());
}

function isDashscopeImageProviderAvailable() {
  return readBooleanEnv("DASHSCOPE_IMAGE_ENABLED") === true && Boolean(getDashscopeApiKey());
}

function isPollinationsImageProviderAvailable() {
  return readBooleanEnv("POLLINATIONS_IMAGE_ENABLED") !== false;
}

function isLocalImageFallbackEnabled() {
  return readBooleanEnv("ALLOW_LOCAL_SVG_FALLBACK") === true;
}

function getEnabledImageProviders() {
  const providers = [];
  const configured = getImageProviderOrder();
  const order = configured.length ? configured : ["gemini", "cloudflare", "huggingface", "qwen", "pollinations"];

  order.forEach(function (provider) {
    const normalized = String(provider || "").trim().toLowerCase();

    if (!isImageProviderWithinDailyLimit(normalized)) {
      return;
    }

    if (normalized === "gemini" && isGeminiImageProviderAvailable()) {
      providers.push(normalized);
    }

    if (normalized === "cloudflare" && isCloudflareImageProviderAvailable()) {
      providers.push(normalized);
    }

    if ((normalized === "huggingface" || normalized === "hf") && isHuggingFaceImageProviderAvailable()) {
      providers.push("huggingface");
    }

    if ((normalized === "qwen" || normalized === "dashscope") && isDashscopeImageProviderAvailable()) {
      providers.push("qwen");
    }

    if (normalized === "pollinations" && isPollinationsImageProviderAvailable()) {
      providers.push(normalized);
    }

    if (normalized === "local" && isLocalImageFallbackEnabled()) {
      providers.push(normalized);
    }
  });

  if (!providers.includes("local") && isLocalImageFallbackEnabled()) {
    providers.push("local");
  }

  return Array.from(new Set(providers));
}

function hasAiImageProvider() {
  return getEnabledImageProviders().some(function (provider) {
    return provider !== "local";
  });
}

function getImageProviderDailyLimit(provider) {
  const limits = {
    gemini: Number(process.env.GEMINI_IMAGE_DAILY_LIMIT || 20),
    cloudflare: Number(process.env.CLOUDFLARE_IMAGE_DAILY_LIMIT || 40),
    huggingface: Number(process.env.HUGGINGFACE_IMAGE_DAILY_LIMIT || 6),
    qwen: Number(process.env.DASHSCOPE_IMAGE_DAILY_LIMIT || 10),
    pollinations: Number(process.env.POLLINATIONS_IMAGE_DAILY_LIMIT || 50),
    local: Number(process.env.LOCAL_IMAGE_DAILY_LIMIT || 10000),
  };
  const limit = limits[provider];
  return Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 0;
}

function getImageUsageDateKey(date) {
  return (date || new Date()).toISOString().slice(0, 10);
}

function readImageUsageArchive() {
  try {
    return JSON.parse(fs.readFileSync(IMAGE_USAGE_PATH, "utf8"));
  } catch {
    return { version: 1, days: {} };
  }
}

function writeImageUsageArchive(archive) {
  try {
    fs.mkdirSync(path.dirname(IMAGE_USAGE_PATH), { recursive: true });
    fs.writeFileSync(IMAGE_USAGE_PATH, JSON.stringify(archive, null, 2));
  } catch {
    // Usage tracking should never break generation.
  }
}

function getImageProviderUsageRecord(archive, provider) {
  const dayKey = getImageUsageDateKey();
  archive.days = archive.days && typeof archive.days === "object" ? archive.days : {};
  archive.days[dayKey] = archive.days[dayKey] && typeof archive.days[dayKey] === "object" ? archive.days[dayKey] : { providers: {} };
  archive.days[dayKey].providers = archive.days[dayKey].providers && typeof archive.days[dayKey].providers === "object"
    ? archive.days[dayKey].providers
    : {};
  archive.days[dayKey].providers[provider] = archive.days[dayKey].providers[provider] && typeof archive.days[dayKey].providers[provider] === "object"
    ? archive.days[dayKey].providers[provider]
    : { success: 0, failure: 0 };
  return archive.days[dayKey].providers[provider];
}

function isImageProviderWithinDailyLimit(provider) {
  const limit = getImageProviderDailyLimit(provider);
  if (limit <= 0) {
    return false;
  }

  const archive = readImageUsageArchive();
  const record = getImageProviderUsageRecord(archive, provider);
  const disabledUntil = record.disabledUntil ? Date.parse(record.disabledUntil) : 0;
  if (disabledUntil && disabledUntil > Date.now()) {
    if (isStaleTemporaryProviderDisable(provider, record)) {
      delete record.disabledUntil;
      writeImageUsageArchive(archive);
    } else {
      return false;
    }
  }

  return Number(record.success || 0) < limit;
}

function recordImageProviderResult(provider, ok, error, model) {
  const archive = readImageUsageArchive();
  const record = getImageProviderUsageRecord(archive, provider);
  const now = new Date();
  record.model = model || record.model || "";
  record.lastAt = now.toISOString();

  if (ok) {
    record.success = Number(record.success || 0) + 1;
    record.lastSuccessAt = record.lastAt;
    delete record.disabledUntil;
    delete record.lastError;
  } else {
    record.failure = Number(record.failure || 0) + 1;
    record.lastFailureAt = record.lastAt;
    record.lastError = error && error.message ? shortenText(error.message, 280) : "Image provider failed.";
    if (isQuotaLikeError(error)) {
      record.disabledUntil = getNextUtcDayIso(now);
    }
  }

  writeImageUsageArchive(archive);
}

function isQuotaLikeError(error) {
  const status = Number(error && error.statusCode);
  const message = String(error && error.message ? error.message : "").toLowerCase();
  if (isTemporaryProviderBackoffError(error)) {
    return false;
  }

  return status === 401 ||
    status === 403 ||
    status === 429 ||
    (status === 402 && /payment|required|paywall|paid|credit|billing|insufficient|subscription/u.test(message)) ||
    /\bquota\b|rate limit|\blimit(?:ed|s)?\b|too many requests|\bcredit\b|billing|insufficient|exceeded|unauthorized|forbidden/u.test(message);
}

function isTemporaryProviderBackoffError(error) {
  const status = Number(error && error.statusCode);
  const message = String(error && error.message ? error.message : "").toLowerCase();
  return status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504 ||
    /queue full|already queued|server busy|temporarily unavailable|try again|timed out|timeout/u.test(message);
}

function isPollinationsQueueFullError(error) {
  const status = Number(error && error.statusCode);
  const message = String(error && error.message ? error.message : "").toLowerCase();
  return (status === 402 || /pollinations|x402|enter\.pollinations\.ai/u.test(message)) &&
    /queue full|already queued|max:\s*1/u.test(message);
}

function isStaleTemporaryProviderDisable(provider, record) {
  if (provider !== "pollinations") {
    return false;
  }

  return isTemporaryProviderBackoffError({
    statusCode: 0,
    message: record && record.lastError ? record.lastError : "",
  });
}

function getNextUtcDayIso(date) {
  const now = date || new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0)).toISOString();
}

function getImageProviderUsageSummary() {
  const archive = readImageUsageArchive();
  const dayKey = getImageUsageDateKey();
  const day = archive.days && archive.days[dayKey] ? archive.days[dayKey] : { providers: {} };
  const summary = {};
  ["gemini", "cloudflare", "huggingface", "qwen", "pollinations", "local"].forEach(function (provider) {
    const record = day.providers && day.providers[provider] ? day.providers[provider] : {};
    summary[provider] = {
      success: Number(record.success || 0),
      failure: Number(record.failure || 0),
      dailyLimit: getImageProviderDailyLimit(provider),
      remaining: Math.max(0, getImageProviderDailyLimit(provider) - Number(record.success || 0)),
      disabledUntil: record.disabledUntil || "",
      lastError: record.lastError || "",
      model: record.model || getImageProviderModelName(provider),
    };
  });

  return {
    date: dayKey,
    path: IMAGE_USAGE_PATH,
    providers: summary,
  };
}

function getImageProviderModelName(provider) {
  if (provider === "gemini") return getImageModel();
  if (provider === "cloudflare") return getCloudflareImageModel();
  if (provider === "huggingface") return getHuggingFaceImageModel();
  if (provider === "qwen") return getDashscopeImageModel();
  if (provider === "pollinations") return getPollinationsImageModel();
  return "local-svg-background";
}

function getTextModel() {
  return process.env.GEMINI_TEXT_MODEL || DEFAULT_TEXT_MODEL;
}

function getSearchTextModel() {
  return process.env.GEMINI_SEARCH_TEXT_MODEL || DEFAULT_SEARCH_TEXT_MODEL;
}

function getGeminiModelCandidates(primaryModel, fallbackEnvName, defaultFallbackModels) {
  const fallbackModels = splitModelList(process.env[fallbackEnvName] || defaultFallbackModels);
  return Array.from(new Set([primaryModel].concat(fallbackModels).map(cleanText).filter(Boolean)));
}

function splitModelList(value) {
  return String(value || "")
    .split(",")
    .map(cleanText)
    .filter(Boolean);
}

function isGoogleSearchGroundingEnabled() {
  const explicitFlag = readBooleanEnv("GEMINI_GOOGLE_SEARCH_ENABLED");
  const paidToolsDisabled = readBooleanEnv("DISABLE_PAID_AI_TOOLS") === true;
  const billingAllowed = readBooleanEnv("AI_BILLING_ALLOWED") === true;

  if (isFreeAiPolicyEnabled()) {
    return false;
  }

  if (explicitFlag === false) {
    return false;
  }

  if (paidToolsDisabled && !billingAllowed) {
    return false;
  }

  return explicitFlag === true && billingAllowed;
}

function isFreeAiPolicyEnabled() {
  const explicit = readBooleanEnv("AI_FREE_MODELS_ONLY");
  return explicit !== false;
}

function getAiPolicySummary() {
  const openRouterModel = DEFAULT_OPENROUTER_MODEL;
  return {
    freeOnly: isFreeAiPolicyEnabled(),
    paidToolsDisabled: readBooleanEnv("DISABLE_PAID_AI_TOOLS") !== false,
    providerOrder: ["gemini", "groq", "openrouter"],
    imageProviderOrder: getEnabledImageProviders(),
    gemini: {
      configured: Boolean(process.env.GEMINI_API_KEY),
      freeTierOnly: readBooleanEnv("GEMINI_FREE_TIER_ONLY") !== false,
      textModel: getTextModel(),
      imageModel: getImageModel(),
    },
    cloudflare: {
      configured: isCloudflareImageProviderAvailable(),
      model: getCloudflareImageModel(),
      dailyLimit: getImageProviderDailyLimit("cloudflare"),
      freeLimitGuard: true,
    },
    huggingFace: {
      configured: isHuggingFaceImageProviderAvailable(),
      model: getHuggingFaceImageModel(),
      dailyLimit: getImageProviderDailyLimit("huggingface"),
      freeLimitGuard: true,
    },
    qwen: {
      configured: isDashscopeImageProviderAvailable(),
      model: getDashscopeImageModel(),
      dailyLimit: getImageProviderDailyLimit("qwen"),
      enabledOnlyWhenExplicit: true,
    },
    pollinations: {
      configured: isPollinationsImageProviderAvailable(),
      keyConfigured: Boolean(process.env.POLLINATIONS_API_KEY),
      model: getPollinationsImageModel(),
      freeLightUseOnly: true,
    },
    flow: {
      configured: false,
      reason: "Google Flow has free UI generations, but no official server API is configured.",
    },
    groq: {
      configured: Boolean(process.env.GROQ_API_KEY),
      freePlanOnly: readBooleanEnv("GROQ_FREE_PLAN_ONLY") !== false,
    },
    openRouter: {
      configured: Boolean(process.env.OPENROUTER_API_KEY),
      model: openRouterModel,
      freeModelsOnly: readBooleanEnv("OPENROUTER_FREE_MODELS_ONLY") !== false,
      modelAllowed: isOpenRouterFreeModel(openRouterModel),
    },
  };
}

function isOpenRouterFreeModel(model) {
  const normalized = String(model || "").trim().toLowerCase();
  return normalized === "openrouter/free" || normalized.endsWith(":free");
}

function readBooleanEnv(name) {
  const value = String(process.env[name] || "").trim().toLowerCase();

  if (["1", "true", "yes", "on"].includes(value)) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(value)) {
    return false;
  }

  return null;
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
  buildImageProvidersUnavailableError,
  buildPollinationsPrompt,
  buildPostPrompt,
  buildScriptureSuggestionPrompt,
  createServer,
  normalizeSuggestedScriptures,
};
