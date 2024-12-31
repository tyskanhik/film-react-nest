FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm сi

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]