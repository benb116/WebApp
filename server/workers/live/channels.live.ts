// All channels for redis pub/sub

// Import channels from channel definition files
import example from './channels/example.channel';

interface LiveChannel {
  sub(message: string): void,
  pub(...args: unknown[]): void,
}

const channelMap: Record<string, LiveChannel> = {
  example,
};

export default channelMap;
