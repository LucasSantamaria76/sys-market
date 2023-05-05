FROM node:16-alpine

RUN npm i -g ts-node

WORKDIR /usr/src/app

COPY package*.json .

COPY . .

RUN yarn

EXPOSE 4000

CMD [ "yarn" , "dev" ]