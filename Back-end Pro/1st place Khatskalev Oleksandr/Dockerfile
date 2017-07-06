FROM mhart/alpine-node:latest

ADD package.json /tmp/package.json

RUN npm i -g yarn
RUN npm -g upgrade yarn
RUN cd /tmp && yarn

RUN yarn global add http-server
RUN yarn global add apidoc
RUN yarn global add concurrently

RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
ADD . /opt/app

RUN apidoc --input routes/ --output docs/

RUN npm test

CMD ["yarn", "start"]