/* eslint-disable no-console */
import WebSocket from 'ws';
import axios from 'axios';

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

const tests = ['open1'];
interface PromiseMap {
  [key: string]: {
    prom: Promise<any>
    res: (value: unknown) => void,
    rej: (value: unknown) => void,
    done: boolean
  }
}
const pMap = tests.reduce((acc, cur) => {
  let pRes: (value: unknown) => void = () => {};
  let pRej: (value: unknown) => void = () => {};
  acc[cur] = {
    prom: new Promise((res, rej) => { pRes = res; pRej = rej; }),
    res: pRes,
    rej: pRej,
    done: false,
  };
  return acc;
}, {} as PromiseMap);

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
  console.log('ready');
}

beforeAll(() => initUsers().catch(console.error));

describe('Live server tests', () => {
  test('Open WS connection', () => pMap.open1.prom.then((data) => {
    expect(data).toBe(true);
  }));
});
