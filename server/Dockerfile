FROM node:10-alpine

WORKDIR /usr/src/app

COPY . .
RUN yarn install

EXPOSE 4000
CMD [ "npm", "start" ]
