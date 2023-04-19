FROM node:16-alpine

WORKDIR /app

EXPOSE 3001

COPY package.json yarn.lock  /app/

RUN yarn install

ADD . /app/

RUN yarn build

CMD [ "yarn", "start" ]