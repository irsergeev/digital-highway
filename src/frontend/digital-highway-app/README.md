# digital-higway-app

Web приложение для работы с трассами (треками). Приложение реализовано на **React** с использованием **Typescript** и **Sass**.

В проекте используется технология **openapi** для автоматической генерации моделей данных и функций взаимодействия с источниками данных.

Подробнее ознакомиться с данным пакетом можно [здесь](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)

**<p style="color:red">Важно !</p>**

_Для корректной работы данного пакета в docker контейнере необходимо наличие установленной последней версии **Java**_

## Запуск приложения в docker

Перейдите в папку, где расположен **Dockerfile** и затем выполните команды:

```
docker build -t digital-highway-web .
```

где **address** - базовый URL backend сервиса

После выполните команду

```
docker run -d -p 3000:80 --name highway-web-app digital-highway-web
```
