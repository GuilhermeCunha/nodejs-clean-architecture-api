#!/bin/bash

docker run -v $PWD:/app -it --rm -w /app node:20 yarn install && yarn run test