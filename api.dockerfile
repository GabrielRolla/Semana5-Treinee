FROM node:18-alpine

RUN mkdir /api

WORKDIR /api

COPY package*.json /api
RUN npm install

COPY . /api

EXPOSE 3000

RUN npx prisma generate