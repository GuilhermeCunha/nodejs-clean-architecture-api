FROM node:16
ENV WORKDIR /opt/app

RUN mkdir $WORKDIR
WORKDIR $WORKDIR
ADD . $WORKDIR

RUN yarn install
RUN yarn run build
RUN yarn cache clean

RUN yarn run typeorm migration:run -d src/infrastructure/db/typeorm/mysql/data-source.ts

EXPOSE 3333
EXPOSE 3334

CMD [ "node", "dist/infrastructure/presentation/http/index.js" ]

