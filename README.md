# AvitoSender Pro

Сервис для массовой рассылки сообщений на Авито по API.

## 🚀 Быстрый старт

### Локальная разработка

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

### Сборка

```bash
npm run build
```

Результат в папке `dist/`.

## 📦 Публикация на GitHub Pages

### Автоматический деплой (рекомендуется)

1. **Включить GitHub Pages через Actions:**
   - Перейти в Settings → Pages
   - Source: **GitHub Actions**
   - Сохранить

2. **Запушить изменения в `main`:**
   ```bash
   git push origin main
   ```

3. **Дождаться завершения workflow** (вкладка Actions).

4. **Сайт доступен по адресу:**
   ```
   https://<username>.github.io/<repo-name>/
   ```

### Ручной деплой

```bash
npm run build
# Загрузить содержимое dist/ в ветку gh-pages
git subtree push --prefix dist origin gh-pages
```

### Настройка корневого домена (опционально)

Чтобы `https://<username>.github.io/` перенаправлял на приложение:

1. Создать репозиторий `<username>.github.io`
2. Скопировать `optional-root-redirect/index.html` в корень
3. Включить Pages: Source → Deploy from branch → main → / (root)

## 🛠 Технологии

- **React 18** + TypeScript
- **Vite** — сборка
- **Tailwind CSS** — стили
- **Recharts** — графики
- **Lucide React** — иконки

## 📋 Функционал

- 📊 Дашборд с аналитикой рассылок
- 📨 Управление кампаниями (создание, пауза, мониторинг)
- 📝 Журнал сообщений с фильтрацией
- 📄 Шаблоны с переменными
- 👥 База контактов
- 💳 Управление подпиской
- ⚙️ Настройки API (ключи, вебхуки, лимиты)

## 🔧 Конфигурация

### vite.config.js

```js
export default defineConfig({
  base: "./", // Относительные пути для GitHub Pages
  // ...
});
```

### GitHub Actions

Workflow в `.github/workflows/deploy.yml` автоматически:
- Собирает проект при push в `main`
- Загружает `dist/` на GitHub Pages
- Деплоит сайт

## 📝 Лицензия

MIT
