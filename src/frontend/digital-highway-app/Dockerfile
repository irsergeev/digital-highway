FROM node:lts-alpine as build

ENV REACT_APP_BACKEND_URL=http://localhost:60381/api/v1

RUN apk add --no-cache openjdk11-jre
RUN npm install -g @openapitools/openapi-generator-cli

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install
COPY . /app

RUN openapi-generator-cli generate -i digital-highway-api.yaml -g typescript-axios -o src/generated && \
    npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]