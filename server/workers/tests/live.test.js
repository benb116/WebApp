/* eslint-disable no-console */
const WebSocket = require('ws');
const axios = require('axios');

function getSessionID(email) {
  return axios({
    method: 'post',
    url: 'http://localhost/app/auth/login',
    data: {
      email,
      password: 'password1',
    },
  }).then((resp) => resp.headers['set-cookie'][0].split(';')[0])
    .catch((err) => {
      console.log(err);
      throw new Error('Could not init session');
    });
}

function initWS(cookie) {
  return new WebSocket('ws://localhost/live/', {
    headers: { cookie },
  });
}

// array of test names
const tests = ['open'];
// each test gets a promise. the promise is pending until it is resolved or rejected
// Then the test checks it
const pMap = tests.reduce((acc, cur) => {
  let pRes;
  let pRej;
  acc[cur] = {
    prom: new Promise((res, rej) => { pRes = res; pRej = rej; }),
  };
  acc[cur].res = pRes;
  acc[cur].rej = pRej;
  acc[cur].done = false;
  return acc;
}, {});

async function initUsers() {
  const session1 = await getSessionID('email1@gmail.com');
  const ws1 = initWS(session1);
  ws1.on('open', pMap.open.res); // Resolve the test promise
  ws1.on('error', pMap.open.rej);

  ws1.on('message', async (text) => {
    const msg = JSON.parse(text);
    switch (msg.event) {
      default:
        break;
    }
  });
  console.log('ready');
}

beforeAll(() => initUsers().catch(console.error));

describe('Live server tests', () => {
  test('Open WS connection', () => pMap.open.prom.then((data) => {
    expect(data).toBe();
  }));
});
