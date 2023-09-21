FROM node:18.12.1

WORKDIR /client_site

COPY ./package*.json ./
RUN npm install
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
RUN chown -R node.node /client_site
COPY . .
CMD npm start
