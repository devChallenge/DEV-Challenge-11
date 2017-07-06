FROM node:7.9

WORKDIR /usr/src/app

# Adding wait-for-it
COPY wait-for-it.sh /usr/src/wait-for-it.sh
RUN chmod +x /usr/src/wait-for-it.sh

# Install app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --production

# Bundle app source
COPY app.js /usr/src/app
COPY public /usr/src/app/public
COPY api /usr/src/app/api

EXPOSE 8080
CMD [ "npm", "start" ]