FROM node:8-slim

WORKDIR /usr/src/app

COPY . .
RUN yarn install

EXPOSE 4000
CMD [ "npm", "start" ]