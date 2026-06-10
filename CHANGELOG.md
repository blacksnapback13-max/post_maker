# Changelog

## 1.2.9 - 2026-06-10

- Removed the remaining per-line text backing from poster canvas output: generated posters now have no blur layer, no translucent backing, and no softened text plate over the image.
- Removed logo shadow blur so canvas rendering contains no explicit blur/shadowBlur operation.
- Tightened image prompts toward sharp, crisp, clear full-frame backgrounds instead of haze, mist, frosted-glass, or soft-panel language.

## 1.2.8 - 2026-06-09

- Removed the client-side blurred duplicate-image cleanup layer from AI poster backgrounds so generated images and PNG exports no longer show a soft frame or misty duplicate overlay.
- Removed full-canvas readability overlays; AI backgrounds now render as the original provider image plus only the app-owned text, reference, local per-line text backing, and optional logo.
- Added adaptive poster typography so long verses shrink into a compact centered block instead of spreading across most of the poster.
- Updated image prompts to stop asking providers for a blank center, text-safe area, frosted-glass panel, or blurred caption zone inside the generated image.

## 1.2.7 - 2026-06-09

- Added a server-side Pollinations request queue so Render sends only one Pollinations image request at a time from the shared IP.
- Added longer dedicated retries for Pollinations `Queue full` / `already queued` errors without treating them as daily quota exhaustion.
- Replaced raw Pollinations `x402` JSON in poster status with a short localized message.
- Documented the intended multi-provider free/limited image stack: Gemini, Cloudflare Workers AI, Hugging Face, Qwen/DashScope, then Pollinations.

## 1.2.6 - 2026-05-18

- Pollinations/Diffusion prompts are now visual-only: no scripture, reference, text, logo, poster, or negative prompt wording is sent in the positive prompt.
- The text/logo artifact ban stays in provider-level `negative` / `negative_prompt` parameters instead of being mixed into the main image prompt.
- Added client-side canvas cleanup for Pollinations/Flux-style backgrounds: small fake lettering is softened before the real verse and reference are drawn.
- Bumped visible app version and release smoke expectations to `1.2.6`.

## 1.2.5 - 2026-05-18

- Убраны провоцирующие слова из image prompt: AI теперь просится делать только чистый `wordless background`, а не постер, цитатник или devotional graphic.
- Pollinations `enhance=true` выключен по умолчанию через `POLLINATIONS_ENHANCE_PROMPT=false`, потому что enhancement мог додумывать типографику.
- Добавлен общий negative prompt против букв, псевдобукв, цифр, логотипов, крестов, печатей, водяных знаков, signage и других артефактов внутри фона.
- Текст стиха, место Писания и логотип должны появляться только нашим canvas-оверлеем, а не внутри AI-фона.

## 1.2.4 - 2026-05-16

- Исправлена карточка подбора места Писания, где структурированная AI-ссылка могла отображаться как `[object Object]`.
- Сервер теперь собирает объектные ссылки вида `{ book, chapter, verse }` в валидный формат `Книга глава:стихи`.
- Невалидные AI-карточки без нормальной ссылки или текста отбрасываются до попадания в интерфейс.
- Фронтенд дополнительно нормализует ссылки и текст карточек перед отображением, выбором и объединением с локальными вариантами.

## 1.2.3 - 2026-05-16

- Исправлен production-баг, из-за которого временная очередь Pollinations (`Queue full`) ошибочно блокировала провайдер на сутки.
- Добавлены короткие повторные попытки Pollinations перед переходом к следующему провайдеру.
- Локальный SVG fallback выключен по умолчанию и включается только новым явным флагом `ALLOW_LOCAL_SVG_FALLBACK=true`, чтобы старые env-переменные Render не возвращали слабые SVG-фоны.
- При падении генерации интерфейс оставляет предыдущий нормальный фон и показывает предупреждение вместо записи локального fallback в историю.

## 1.2.2 - 2026-05-16

- Добавлен маршрутизатор качественных image-провайдеров с дневными лимитами и архивом `data/image-usage.json`.
- Цепочка генерации расширена до `gemini -> cloudflare -> huggingface -> qwen -> pollinations`.
- Добавлены optional-провайдеры: Cloudflare Workers AI Flux, Hugging Face Flux/Qwen и Qwen Image через DashScope.
- Qwen/DashScope выключен по умолчанию и включается только через `DASHSCOPE_IMAGE_ENABLED=true`, чтобы не уйти в платный режим случайно.
- Добавлен endpoint `/api/image-usage` для проверки дневного расхода и заблокированных по квоте провайдеров.

## 1.2.1 - 2026-05-16

- Добавлен видимый бейдж версии сборки в интерфейсе; `/api/config` и `/api/status` теперь возвращают `version`.
- Усилен image-пайплайн: Gemini остается первым провайдером, Pollinations/Flux добавлен как бесплатный fallback, локальный SVG остается последней страховкой.
- Gemini image-запрос теперь учитывает формат постера и 2K-настройку через совместимый `imageConfig`.
- Live smoke test теперь проваливается, если генерация картинки упала в локальный fallback вместо реального AI-провайдера.

## 1.2.0 - 2026-05-16

- Закреплена политика `free-tier-only` для AI API: Gemini остается базовым провайдером, Groq зарезервирован под быстрые бесплатные сценарии, OpenRouter допускается только как `openrouter/free` или модели с суффиксом `:free`.
- Gemini Google Search grounding автоматически выключен в free-only режиме, чтобы случайно не включить billable tool.
- Добавлены export presets для соцсетей: Instagram 4:5, Instagram square, Stories/Reels 9:16, YouTube/Telegram 16:9, Facebook/Link 1200x630 и Pinterest 2:3.
- Добавлена локальная история сгенерированных постов и фонов в браузере: восстановление, копирование, скачивание превью и очистка истории.
- Расширены форматы постера в настройках: Facebook/Link 1200x630 и Pinterest 2:3.

## 1.1.0 - 2026-05-15

- Усилены различия между стилями постов и стилями AI-фона.
- Пользовательская тема из шага 1 привязана к подбору Писания, генерации поста и генерации картинки.
- Добавлены Gemini fallback-модели, retry и timeout.
- Добавлен локальный SVG fallback для фонов, чтобы UI и PNG-экспорт не падали при недоступной image-квоте.
- Добавлены release smoke tests и UI smoke tests с отчетом и скриншотами.

## 1.0.0 - 2026-05-08

- Первая готовая сборка, используемая на сайте.
