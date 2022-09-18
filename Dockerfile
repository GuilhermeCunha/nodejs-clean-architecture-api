FROM node:16
ENV WORKDIR /opt/app

RUN mkdir $WORKDIR
WORKDIR $WORKDIR
ADD . $WORKDIR

RUN yarn install
RUN yarn run build
RUN yarn cache clean

EXPOSE 3333

CMD [ "node", "dist/infrastructure/presentation/http/index.js" ]

