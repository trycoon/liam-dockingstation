const WebSocket = require('ws');
const forwarded = require('forwarded-for');
const fastifyWebSocket = require('fastify-websocket');

/* eslint-disable no-param-reassign */
/**
 *  WebSocket subscription and broadcast functionality
 * @param {object} fastify Fastify instance
 * @param {object} logger Logger instance
 */
function webSocketHandler(fastify, logger) {
  // Register Websocket endpoint
  fastify.register(fastifyWebSocket);

  fastify.get('/ws', { websocket: true }, (connection, req) => {
    connection.isAlive = true;
    connection.ip = forwarded(req, req.headers).ip;

    connection.socket.on('pong', function heartbeat() {
      this.isAlive = true;
    });

    connection.socket.on('close', () => {
      logger.debug(`Websocket connection for client ${connection.ip} closed.`);
    });

    connection.socket.on('error', error => {
      logger.warn(`Websocket error from client ${connection.ip}, error: ${error.message}.`);
    });
  });

  // clear inactive websocket clients after 30 seconds.
  setInterval(() => {
    // eslint-disable-next-line consistent-return
    fastify.websocketServer.clients.forEach(ws => {
      if (ws.isAlive === false) return ws.terminate();

      // eslint-disable-next-line no-param-reassign
      ws.isAlive = false;
      ws.ping(() => {});
    });
  }, 30000);

  /**
   * Broadcast provided message to all connected WebSocket clients.
   * @param {string} action type of message
   * @param {object} payload payload to send (will be transformed into a JSON string)
   */
  function broadcast(action, payload) {
    const msg = JSON.stringify({
      action,
      payload,
    });

    fastify.websocketServer.clients.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(msg);
      }
    });
  }

  return {
    broadcast,
  };
}

module.exports = webSocketHandler;
