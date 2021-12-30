import { sendToAll } from '../socket.live';

import { client } from '../../../db/redis';

export interface ExampleType {
  [key: string]: string | null
}

const example = {
  pub: function pub(obj: ExampleType) {
    client.publish('example', JSON.stringify(obj));
  },
  sub: function sub(message: string) {
    sendToAll({ event: 'example', update: JSON.parse(message) });
  },
};

export default example;
