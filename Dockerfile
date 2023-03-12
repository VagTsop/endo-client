#stage 1

FROM node:14.17.3-alpine as build

WORKDIR /app

COPY package.json  .

RUN npm install

COPY . .

RUN npm run build

#stage 2

FROM nginx:stable-alpine

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

COPY server.key /etc/nginx/certs/server.key

COPY server.crt /etc/nginx/certs/server.crt

COPY --from=build /app/dist/endofusion-client /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g", "daemon off;"]