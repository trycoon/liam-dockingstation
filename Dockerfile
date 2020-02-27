# Use small Alpine Linux image
FROM node:12-alpine AS liam_build

COPY . /app/

WORKDIR /app

# Make sure dependencies exist for Webpack loaders
RUN apk add --no-cache \
  autoconf \
  automake \
  bash \
  g++ \
  libc6-compat \
  libjpeg-turbo-dev \
  libpng-dev \
  make \
  nasm \
  python

RUN npm ci
RUN npm run build
# remove NPM-packages only used when building client (webpack, eslint and more)
RUN npm prune --production

############################################################

FROM node:12-alpine AS liam_run

ENV NODE_ENV production
EXPOSE 3000

WORKDIR /app

ENTRYPOINT [ "npm run run" ]

COPY --from=liam_build /app/docker-compose.yml /app/
COPY --from=liam_build /app/node_modules /app/node_modules
COPY --from=liam_build /app/src /app/src
COPY --from=liam_build /app/client/dist /app/client

