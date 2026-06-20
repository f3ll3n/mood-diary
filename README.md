# bipolarity-2 reborn

> всё ещё бета, напоминаю

Дневник настроения для людей с биполярным расстройством в стилистике интерфейса Dota 2.

## Возможности

- Оценка общего настроения за день (шкала от -5 до +5)
- Сатирический «ощущаемый нетворс» и счётчик «Clarity Mana» (энергетики)
- Календарь с цветовой индикацией настроения
- Post-game графики за последние 30 дней
- Match Summary — экран итогов дня в духе статистики после катки

## Стек

- React + TypeScript + Vite
- Zustand (с persist)
- IndexedDB (с fallback на LocalStorage)
- SCSS Modules
- FSD (Feature-Sliced Design)
- Recharts

## Запуск

```bash
npm install
npm run dev
```

Локально приложение доступно по адресу `http://localhost:5173/mood-diary/` (из‑за base path для GitHub Pages).

Проверка production-сборки:

```bash
npm run build
npm run preview:pages
```

## Деплой на GitHub Pages

Сайт: **https://f3ll3n.github.io/mood-diary/**

1. В репозитории: **Settings → Pages → Build and deployment → Source** → выбери **GitHub Actions**.
2. Запушь изменения в ветку `master` или `main` — workflow `.github/workflows/deploy.yml` соберёт проект и задеплоит `dist`.

Деплой также можно запустить вручную: **Actions → Deploy to GitHub Pages → Run workflow**.

Если репозиторий переименуешь — обнови `base` в `vite.config.ts` и `VITE_BASE_PATH` в workflow.

## Структура (FSD)

```
src/
  app/        — инициализация, глобальные стили
  pages/      — страницы
  widgets/    — составные блоки UI
  features/   — пользовательские сценарии
  entities/   — бизнес-сущности (DayEntry, store)
  shared/     — UI-kit, утилиты, конфиг
```

Данные хранятся локально в браузере. Приложение не заменяет медицинскую помощь.
