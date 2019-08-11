# Bike Sharing

Bike sharing app that runs on Web, iOS and Android.

## Client

Run:

```sh
yarn # install dependencies
yarn web # open in browser
yarn ios # open in iOS emulator
yarn ios # open in Android emulator
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
docker-compose up
docker-compose build -d
```

To update the server:

```sh
cd bike-sharing/server/
git pull
docker-compose up
docker-compose build -d
```
