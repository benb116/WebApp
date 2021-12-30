// Websocket server worker
// Subscribe to redis updates and push out to clients

import WebSocket from 'ws';
import http from 'http';
import express, { Request } from 'express';

import session from '../middleware/session';
import logger from '../utilities/logger';

import liveState from './live/state.live'; // Data stored in memory
import channelMap from './live/channels.live';

import { subscriber } from '../db/redis';

// All channels that may be used

// Set up redis subscribers
(async () => {
  await subscriber.connect();
  Object.keys(channelMap).forEach((c) => {
    subscriber.subscribe(c, (message, channel) => {
      // When a message comes in, dispatch it to correct subscriber fn
      channelMap[channel].sub(message);
    }).catch(logger.error);
  });
})();

// WS server on top of express
const app = express();
app.use(session);
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

server.on('upgrade', (request: Request, socket, head) => {
  // @ts-expect-error Second arg is unnecessary, just give empty obj
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

// New ws connection
wss.on('connection', async (ws, request: Request) => {
  if (!request.session.user) {
    ws.send('No user found');
    return;
  }
  // Add to connection map (ws <-> user)
  const userID = request.session.user.id;
  liveState.connmap.set(userID, ws);

  // Can pull params from request url
  // const requestTerms = request.url.split('/');
  // const param = requestTerms[requestTerms.length - 1];

  ws.on('message', (message) => {
    logger.info(message);
  });

  ws.on('close', () => {
    liveState.connmap.delete(userID);
  });
});

server.listen(process.env.LIVE_PORT, () => {
  logger.info(`Live server listening on port ${process.env.PORT}`);
});
