const pino = require('pino');
const pinoElastic = require('pino-elasticsearch');
const Fastify = require('fastify');
const blipp = require('fastify-blipp');
const staticServer = require('fastify-static');
const openApiGlue = require('fastify-openapi-glue');
const gracefulShutdown = require('fastify-graceful-shutdown');
const store = require('./store.js');
const RestApiHandler = require('./rest-api.js');
const webSocketHandler = require('./websocket_handler');

const isProd = process.env.NODE_ENV === 'production';

(async function main() {
  // Setup logging to Elasticsearch
  const streamToElastic = pinoElastic({
    index: 'liam',
    type: 'log',
    consistency: 'one',
    node: 'http://localhost:9200',
    'es-version': 7,
    'bulk-size': 200,
    ecs: true,
  });
  const logger = pino(
    {
      level: process.env.LOG_LEVEL || 'debug',
      useLevelLabels: true, // http://getpino.io/#/docs/api?id=uselevellabels-boolean
    },
    streamToElastic,
  );

  logger.info('Please wait, starting Liam docking station...');

  // Log unhandled errors during application crash
  /*process.on(
    'uncaughtException',
    pino.final(logger, (err, finalLogger) => {
      finalLogger.error(`uncaughtException, message: ${err.message}`);
      // eslint-disable-next-line no-console
      console.error(`uncaughtException, message: ${err.message}`);
      process.exit(1);
    }),
  );*/

  /*process.on(
    'unhandledRejection',
    pino.final(logger, (err, finalLogger) => {
      finalLogger.error(`unhandledRejection, message: ${err.message}`);
      // eslint-disable-next-line no-console
      console.error(`unhandledRejection, message: ${err.message}`);
      process.exit(1);
    }),
  );*/
  // Startup database store.
  await store.init();

  const fastify = Fastify({
    // https://www.fastify.io/docs/latest/Server/
    logger,
    ignoreTrailingSlash: true,
    maxParamLength: 100, // characters
    bodyLimit: 1048576, // 1MiB
    disableRequestLogging: true, // we do it ourselves below.
    trustProxy: true, // we should sit behind a NGINX server
    return503OnClosing: true,
  });

  // Allow ongoing REST-requests to finish before closing application.
  fastify.register(gracefulShutdown);
  // Plugin for printing out available routes.
  fastify.register(blipp);

  // Accesslog
  fastify.addHook('onRequest', (req, res, done) => {
    req.log.debug({ method: req.req.method, url: req.req.url, id: req.id }, 'received request');
    done();
  });

  fastify.addHook('onResponse', (req, res, done) => {
    req.log.debug(
      { method: req.req.method, url: req.req.originalUrl, statusCode: res.res.statusCode },
      'request completed',
    );
    done();
  });

  // Register REST endpoints from OpenAPI-file
  fastify.register(
    openApiGlue,
    {
      specification: `${__dirname}/../client/swagger/liam-openapi.json`,
      service: RestApiHandler({
        fastify,
        store,
      }),
      prefix: 'api',
      noAdditional: true,
    },
    {},
  );

  // Setup Websocket endpoint, allowing us to notify subscribing client of changes.
  webSocketHandler(fastify, logger);

  // Register static files handler, for serving resources (Javascript, Stylesheets, HTML, images...)
  fastify
    .register(staticServer, {
      root: `${__dirname}/../client`,
      prefix: '/',
    })
    .after(() => {
      // Register custom clean up handler
      fastify.gracefulShutdown((code, cb) => {
        cb();
      });
    });

  // Default route, return SPA start page.
  fastify.get('/', (req, reply) => {
    reply.sendFile('html/index.html');
  });

  // Root of API, give Swagger start page.
  fastify.get('/api', (req, reply) => {
    reply.sendFile('swagger/swagger.html');
  });
  fastify.get('/liam-openapi.json', (req, reply) => {
    reply.sendFile('swagger/liam-openapi.json');
  });

  // Start webserver
  const start = async () => {
    try {
      await fastify.listen(process.env.PORT || 3000);
      fastify.log.info(`REST service listening on port: ${fastify.server.address().port}`);
      // Print out available REST-endpoint to console when starting up.
      fastify.blipp();
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };
  start();

  // https://github.com/lependu/fastify-webpack-hmr ??
})();
