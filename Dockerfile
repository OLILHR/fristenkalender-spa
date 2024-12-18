FROM node:20.13-alpine as build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:stable

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html