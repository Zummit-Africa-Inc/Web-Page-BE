FROM node:14-alpine

WORKDIR /zaw-be

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]