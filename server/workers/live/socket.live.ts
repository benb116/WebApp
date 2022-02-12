// Socket utility functions

import liveState from './state.live'; // WS server

export interface MessageType {
  event: string,
  [key: string]: unknown,
}
export interface MessageMapType {
  [key: string]: MessageType,
}

// Send a message to a specific user
export function sendToUser(userID: number, msg: MessageType) {
  const thews = liveState.connmap.get(userID);
  if (!thews) { liveState.connmap.delete(userID); return; }
  thews.send(JSON.stringify(msg));
}

// Send messages to users in specific groups
// Input as a map of groupID: messageObj
export function sendToGroups(msgMap: MessageMapType) {
  liveState.groupmap.forEach((cID: number, thews) => {
    if (!msgMap[cID]) { return; }
    if (!thews) { liveState.groupmap.delete(thews); return; }
    if (thews.readyState === 1) {
      thews.send(JSON.stringify(msgMap[cID]));
    }
  });
}

// Send message to all users
export function sendToAll(msg: MessageType) {
  liveState.groupmap.forEach(async (_thegroupID: number, thews) => {
    if (!thews) { liveState.groupmap.delete(thews); return; }
    if (thews.readyState === 1) thews.send(JSON.stringify(msg));
  });
}
