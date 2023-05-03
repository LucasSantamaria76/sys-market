FROM node:18-alpine

RUN npm i -g ts-node

WORKDIR /usr/app

COPY package*.json .

COPY . .

RUN npm i

EXPOSE 4000

CMD [ "npm", "start" ]