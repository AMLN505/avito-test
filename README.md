# Кинопоиск API
## О проекте
Приложение просмотра информации о фильмах и сераилах.

## Возможности проекта
- Поиск фильма по названию;
- Фильтрация фильмов по году выпуска, возрастному рейтингу, стране, количеству фильмов на одной странице;
- Просмотр детальной информации о фильме;
- Авторизация пользователя;
- Получение случайного фильма по заданным параметрам (жанр, страна, тип, год выпуска, рейтинг, сеть производства).

## Выполненные дополнительные задания
 - Возможность поделиться результатами выдачи с другими пользователями через копирование ссылки;
 - Сохранение истории поиска;
 - При вводе нового названия появляется suggest с предложениями из ранее введенных значений;
 - При вводе значений происходит фильтрация подсказок по вхождению;
 - Поиск осуществляется не при каждом вводе символа, а в момент когда с ввода последнего символа прошла 1 секунда (debounce);
 - Авторизация (логин: dev, пароль: dev);
 - Страница c поиском рандомного фильма, доступная только авторизованным пользователям;
 - Использование TypeScript;
 - Выполнение трёх попыток повторного запроса, если запрос был неудачным;

## Используемые запросы к API
- Получение списка фильмов по заданным параметрам:
  `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}&year=${year}&countries.name=${country}&ageRating=${ageRating}`
- Получение списка фильмов по названию:
	`https://api.kinopoisk.dev/v1.4/movie/search?page=${page}&limit=${limit}&query=${query}`
- Получение списка стран:
  `https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name`
- Получение информации о фильме по ID:
  `https://api.kinopoisk.dev/v1.4/movie/${id}`
- Получение информации об изображениях фильма:
  `https://api.kinopoisk.dev/v1.4/image?page=1&limit=30&selectFields=&movieId=${id}&type=!shooting`
- Получение информации об отзывах о фильме:
  `https://api.kinopoisk.dev/v1.4/review?page=${page}&limit=3&movieId=${id}`
- Получение информации о сезонах и сериях:
  `https://api.kinopoisk.dev/v1.4/season?page=${page}&limit=10&movieId=${id}`
- Получение списка жанров:
  `https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name`
- Получение случайного фильма, соответствующего параметрам:
  `https://api.kinopoisk.dev/v1.4/movie/random?isSeries=${isSeries}&rating.kp=${kpRating}&genres.name=${genre}&countries.name=${country}&networks.items.name=${studio}`

## Инструкция по запуску
1. Скачать сборку из ветки main;
2. Открыть проект в IDE;
3. Установить пакеты, используемые в приложении;
4. Запустить проект (вставив свой токен в выделенное место **token**):
   - POWERSHELL:
     ```$env:REACT_APP_TOKEN="token" ; npm run start```
     
   - BASH:
      ```REACT_APP_TOKEN=token npm run start```
     
   - CMD:
     ```set REACT_APP_TOKEN=token && npm run start```

