FROM node:14 AS build

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build