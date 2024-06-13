FROM node:18-alpine

RUN mkdir /api

WORKDIR /api

COPY package*.json /api
RUN npm install

COPY . /api

EXPOSE 8080

RUN npx prisma generate