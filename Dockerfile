#stage 1

FROM node:14.17.3-alpine as build

WORKDIR /app

COPY package.json  .

RUN npm install

COPY . .

RUN npm run build

#stage 2

FROM nginx:stable-alpine

COPY --from=build /app/dist/endofusion-client /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g", "daemon off;"]