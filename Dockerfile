# Preparing build image 
FROM node:16.8-alpine3.14 as build_image
RUN apk update && apk upgrade --no-cache && apk add --no-cache git 

# TODO: temporary workaround until UID issue with Alpine is fixed
# https://github.com/npm/uid-number/issues/3
RUN npm config set unsafe-perm true
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build

## Add the wait script to be used by tests mainly
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

# Preparing final image 
FROM node:16.8-alpine3.14 as final_image 
RUN apk update && apk upgrade --no-cache  
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node --from=build_image /usr/src/app/package*.json ./
COPY --chown=node --from=build_image /usr/src/app/nest-cli.json ./
COPY --chown=node --from=build_image /usr/src/app/tsconfig*.json ./
COPY --chown=node --from=build_image /usr/src/app/node_modules ./node_modules
COPY --chown=node --from=build_image /usr/src/app/dist ./dist
COPY --chown=node --from=build_image /usr/src/app/.sequelizerc ./
COPY --chown=node --from=build_image /usr/src/app/migrations.js ./
COPY --chown=node --from=build_image /usr/src/app/migrations ./migrations
EXPOSE 3000
RUN export PACKAGE_VERSION=$(npm run version --silent)
CMD [ "npm", "start" ]
