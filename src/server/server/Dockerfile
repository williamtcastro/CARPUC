FROM node:lts-alpine3.13 as build-step

RUN mkdir /server

WORKDIR /server

COPY package.json /server

RUN npm install

COPY . /server
CMD ["node", "src/server.js"]
