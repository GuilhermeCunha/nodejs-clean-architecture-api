#!/bin/bash

yarn run typeorm migration:run -d src/infrastructure/db/typeorm/mysql/data-source.ts
yarn run start:api