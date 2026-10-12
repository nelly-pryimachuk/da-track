# DA Track

Веб-сайт портфоліо для відстеження прогресу у вивченні дата-аналітики.

Поточний результат: головна сторінка з каталогом навичок (SQL, Excel, Power BI).

## Середовище

Node.js: v24.21.0
npm: 11.19.0
Git: 2.55.0
Docker: 29.8.0, Docker Compose: v5.5.1
Основний варіант: A (Windows, стандартні інсталятори)
React Router: 8.4.0

## Запуск

Нативно: `npm install`, потім `npm run dev`.

Docker:
docker compose build
docker compose run --rm web npm install
docker compose up

Адреса Docker: http://localhost:5173.
Зупинення контейнера: `Ctrl+C`, видалення: `docker compose down`.

## Збірка
npm run build

Або: `docker compose run --rm web npm run build`

## План

Див. [docs/project-plan.md](docs/project-plan.md).

Маршрути й прямі адреси для перевірки описані в docs/project-plan.md.
Чернетка кейсу не зберігається: вона скидається при виході зі сторінки
та при перезавантаженні.

Реалізовано повний локальний CRUD для кейсів: створення, перегляд, редагування
та видалення з валідацією форм, пошуком, фільтром за навичкою й сортуванням.
Кейси зберігаються лише в пам'яті запущеного застосунку: після перезавантаження
сторінки відновлюються початкові записи з src/data/cases.js.