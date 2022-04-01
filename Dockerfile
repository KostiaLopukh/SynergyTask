FROM node:17-alpine

MAINTAINER KostiaLopukh

RUN apk add bash
RUN mkdir /app
WORKDIR /app

COPY ./server /app
RUN npm install

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

