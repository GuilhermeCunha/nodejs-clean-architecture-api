FROM node:16
COPY . .


RUN yarn install
RUN yarn run build
RUN yarn cache clean

EXPOSE 3333
EXPOSE 3334

CMD [ "node", "dist/infrastructure/presentation/http/index.js" ]