// Set up redis connections and utilities

import { createClient } from 'redis';

export const REDIS_HOST = (process.env.REDIS_HOST || 'localhost');
export const REDIS_PORT = (Number(process.env.REDIS_PORT) || 6379);

const connObj = {
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  socket: { connectTimeout: 15000 },
};
export const client = createClient(connObj);
client.connect();
// Subscriber has to be a separate client
export const subscriber = client.duplicate();

// Connection options for bull queues
export const queueOptions = { redis: { port: REDIS_PORT, host: REDIS_HOST } };

function emailVer(rand: string) {
  return `emailVer:${rand}`;
}

function passReset(rand: string) {
  return `passReset:${rand}`;
}

export const rediskeys = {
  emailVer,
  passReset,
};
