FROM node:lts-alpine as build

RUN apk add --no-cache openjdk11-jre
RUN npm install -g @openapitools/openapi-generator-cli

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Установим переменную окружения для прокси
ENV REACT_APP_PROXY=http://localhost:60381

RUN npm install
COPY . /app

# Обновим package.json с правильным значением прокси
RUN sed -i 's|"proxy": ".*"|"proxy": "${REACT_APP_PROXY}"|' /app/package.json

# Генерация кода и сборка проекта
RUN openapi-generator-cli generate -i digital-highway-api.yaml -g typescript-axios -o src/generated && \
    npm run build

# Сервис Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]