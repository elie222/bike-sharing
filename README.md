# Bike Sharing

Bike sharing app that runs on Web, iOS and Android.

This is a boilerplate project which is also used for experimentation.

You can play with the hackathon app that was built on top of this boilerplate here (for the client we used the `client-rnw` folder):

[https://expo.io/@elie/shopitt](https://expo.io/@elie/shopitt)

You can read more about the philosophy behind this project in the following articles:

- [How We Write Full Stack JavaScript Apps](https://medium.com/@eliezer/how-writing-simple-javascript-got-us-6200-github-stars-in-a-single-day-420b17b4cff4)
- [Our Hackathon Experience](https://medium.com/@eliezer/how-to-win-a-hackathon-c50413500741)

## Client

Run:

```sh
yarn # install dependencies
yarn web # open in browser
yarn ios # open in iOS emulator
yarn android # open in Android emulator
yarn storybook # view components in Storybook
```

## Server

Run:

```sh
yarn watch
```

### Deploy Server

- Create a server on something like DigitalOcean or AWS.
- Git clone the project to the server
- Install Docker and Docker Compose
- Add production.json settings file in config folder

Then run:

```sh
cd bike-sharing/server/
docker-compose build
docker-compose up -d
```

To update the server:

```sh
cd bike-sharing/server/
git pull
docker-compose build
docker-compose up -d
```
