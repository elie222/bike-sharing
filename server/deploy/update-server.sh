#!/bin/bash

cd bike-sharing/server
git pull
docker-compose build
docker-compose up -d