# digital-highway

Приложение разделено на две части - **backend** и **frontend**

## Backend часть

Backend часть реализована в виде 2 (двух) основных приложений:

- **API Сервис** - основной сервис для REST взаимодействия
- **Data prepare tool** - приложение для генерации тестовых значений

В качестве базы данных используется **MongoDB**

Для запуска backend части в docker необходимо из командной строки перейти
в папку с файлом **backend_docker_compose.yml** и в консоли выполнить следующую команду

```
docker-compose -f backend_docker_compose.yml up --build
```

Compose файл выпонит следующие действия:

- Развернет базу данных MongoDB в контейнере

- Соберет и выполнит приложение **Data prepare tool**

- Соберет и развернет основной **API Сервис**

## Frontend часть

Для развертывания frontend части приложения необходимо ознакомиться с **README** файлом [здесь](https://github.com/irsergeev/digital-highway/blob/develop/src/frontend/digital-highway-app/README.md)
