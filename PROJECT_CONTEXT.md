# Пост мейкер

Рабочая папка:

`/Volumes/T eror/AI/Apps/Пост мейкер`

## Назначение

Генератор христианских постов и постеров с Gemini, языками, стилями, AI-фоном и desktop/mobile версиями.

## Статус

- Статус: Готов
- Версия: v1.2.2
- Готовая сборка: да

## На чем остановились

Подготовлена рабочая сборка v1.2.2: версия отображается в интерфейсе, image-генерация идет через дневной роутер `gemini -> cloudflare -> huggingface -> qwen -> pollinations -> local`, а расход пишется в `data/image-usage.json`.

## Следующие шаги

- Выкатить v1.2.2 на сервер и проверить production env-переменные.
- Проверить продовый `/api/config`: должен отдавать `version: "1.2.2"`, `imageProviders` и `imageProviderUsage`.

## Ошибки и риски

- Для AI-текста нужен GEMINI_API_KEY в .env; если image quota недоступна, API пробует Cloudflare/Hugging Face/Qwen/Pollinations, затем локальный SVG fallback-фон.
- Gemini Google Search grounding отключен в free-only режиме; для этого проекта не включать billable tools.
- Если Gemini перегружен, сервер пробует fallback-модели и ограничивает ожидание запроса.
- История хранится в localStorage браузера; при переполнении квоты старые записи теряют превью фона, но текст сохраняется.

## Рекомендации Codex

- AI API: использовать только бесплатные ключи/модели; Gemini база, Groq скорость, OpenRouter тесты через openrouter/free или :free.
- Поддерживать CHANGELOG.md для каждой сборки, потому что проект уже используется на сайте.
- Следующим шагом добавить пакетный экспорт сразу в несколько форматов.

## История изменений

- 2026-05-15T19:45:00Z: Версия v1.1: релизная сборка с усиленной рандомизацией, web-grounding флагами, fallback-моделями, локальным fallback-фоном, API/UI smoke-тестами и скриншотами.
- 2026-05-16T00:00:00Z: Версия v1.2: free-only AI policy, CHANGELOG.md, соцсетевые export presets, локальная история постов и фонов.
- 2026-05-16T01:30:00Z: Версия v1.2.1: бейдж версии в UI, версия в `/api/config`, бесплатный Pollinations/Flux fallback для image generation.
- 2026-05-16T12:20:00Z: Версия v1.2.2: дневной роутер image-провайдеров, Cloudflare Flux, Hugging Face Flux/Qwen, Qwen/DashScope и endpoint `/api/image-usage`.
- 2026-05-15T15:20:57.317140Z: Добавлено общее правило бесплатных AI API ключей для всех программ.

## Правило среды

Все файлы проекта, модели, ассеты, временные данные и заметки хранятся внутри этой папки или внутри `/Volumes/T eror/AI`.

## API ключи

Только бесплатные API ключи и бесплатные модели. Gemini API - база, Groq - скорость, OpenRouter - тесты через `openrouter/free` или `:free`. Платный billing/prepaid/paid tier/paid tools не включать без отдельного подтверждения.
