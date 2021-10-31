// Set up redis connections and utilities

const { promisify } = require('util');
const redis = require('redis');

const REDIS_HOST = (process.env.REDIS_HOST || 'localhost');
const REDIS_PORT = (process.env.REDIS_PORT || 6379);

// Used for all commands and publishing
const client = (function createClient() {
  return redis.createClient(
    REDIS_PORT,
    REDIS_HOST,
  );
}());

// Used for subscribing (must be separate client)
const subscriber = (function createClient() {
  return redis.createClient(
    REDIS_PORT,
    REDIS_HOST,
  );
}());

const queueOptions = { redis: { port: REDIS_PORT, host: REDIS_HOST } };

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);
const hsetAsync = promisify(client.hset).bind(client);
const hgetAsync = promisify(client.hget).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

function emailVer(rand) {
  return `emailVer:${rand}`;
}

function passReset(rand) {
  return `passReset:${rand}`;
}

const rediskeys = {
  emailVer,
  passReset,
};

const get = {
  key: getAsync,
  hkey: hgetAsync,
  hkeyall: hgetallAsync,
};

const set = {
  key: setAsync,
  hkey: hsetAsync,
};

const del = {
  key: delAsync,
};

module.exports = {
  client,
  subscriber,
  queueOptions,
  rediskeys,
  get,
  set,
  del,
};
