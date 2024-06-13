FROM node:18-alpine

RUN mkdir /api

COPY ./* ./api

WORKDIR /api

RUN npm install
RUN npx prisma migrate dev --name init