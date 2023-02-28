FROM node:18.14.2-alpine3.17


COPY src /app/src
COPY package.json /app/package.json
WORKDIR /app
RUN apk add git
RUN npm install -g npm
RUN npm install pnpm -g

RUN pnpm i
RUN pnpm build 
RUN pnpm build:index
RUN pnpm upload