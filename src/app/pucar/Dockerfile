FROM node:lts-alpine3.13 as build-step

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app
RUN npm run build

# Stage 2
FROM nginx:1.19.10-alpine

COPY --from=build-step /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]