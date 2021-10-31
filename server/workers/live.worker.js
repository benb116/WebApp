// Main websocket server code

const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const session = require('../middleware/session');

const logger = require('../utilities/logger');

// WS server on top of express
const app = express();
app.use(session);
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  session(request, {}, () => {
    if (!request.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
});

const connmap = new Map(); // Which ws connection corresponds to which user

// New ws connection
wss.on('connection', async (ws, request) => {
  // Add to connection map (ws <-> user)
  const userID = request.session.user.id;
  connmap.set(userID, ws);
  // eslint-disable-next-line no-param-reassign
  ws.userID = userID;

  // Can pul params from request url
  // const requestTerms = request.url.split('/');
  // const param = requestTerms[requestTerms.length - 1];

  // Can send info from server to a specific ws
  // const thews = connmap.get(userID);
  // if (!thews) { connmap.delete(userID); return; }
  // thews.send(JSON.stringify({ event: 'offerCancelled', offerID }));

  ws.on('message', (message) => {
    logger.info(message);
  });

  ws.on('close', () => {
    connmap.delete(userID);
  });
});

server.listen(process.env.PORT, () => {
  logger.info(`Live server listening on port ${process.env.PORT}`);
});
