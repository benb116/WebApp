/* eslint-disable no-console */
import WebSocket from 'ws';
import axios from 'axios';
import { TestPromiseMap } from '../../features/util/util.tests';

const contestID = 2;

function getSessionID(email: string) {
  return axios({
    method: 'post',
    url: 'http://localhost/app/auth/login',
    data: {
      email,
      password: 'password1',
    },
  }).then((resp) => {
    if (!resp.headers['set-cookie']) throw Error('No cookie');
    return resp.headers['set-cookie'][0].split(';')[0];
  })
    .catch((err) => {
      console.log(err);
      throw new Error('Could not init session');
    });
}

function initWS(cookie: string) {
  return new WebSocket(`ws://localhost/ballstreetlive/contest/${contestID}`, {
    headers: { cookie },
  });
}

const tests = ['init', 'open1'];
const pMap = TestPromiseMap(tests);

async function initUsers() {
  const session1 = await getSessionID('email1@gmail.com');
  const ws1 = initWS(session1);
  ws1.on('open', () => {
    pMap.open1.res(true);
  });
  ws1.on('error', console.log);

  ws1.on('message', async (text: string) => {
    const msg = JSON.parse(text.toString());
    switch (msg.event) {
      default:
        break;
    }
  });
  pMap.init.res(true);
}

beforeAll(() => initUsers().catch(console.error));

describe('Live server tests', () => {
  test('Initialization', () => pMap.init.prom.then((data) => {
    expect(data).toEqual(true);
  }));

  test('Open WS connection', () => pMap.open1.prom.then((data) => {
    expect(data).toBe(true);
  }));
});
