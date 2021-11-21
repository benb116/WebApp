const liveState = require('./state.live'); // WS server

function sendToUser(userID, msg) {
  const thews = liveState.connmap.get(userID);
  if (!thews) { liveState.connmap.delete(userID); return; }
  thews.send(JSON.stringify(msg));
}

function sendToGroups(msgMap) {
  liveState.groupMap.forEach((gID, thews) => {
    if (!msgMap[gID]) { return; }
    if (!thews) { liveState.groupMap.delete(thews); return; }
    if (thews.readyState === 1) {
      thews.send(JSON.stringify(msgMap[gID]));
    }
  });
}

function sendToAll(msg) {
  liveState.groupMap.forEach(async (groupID, thews) => {
    if (!thews) { liveState.groupMap.delete(thews); return; }
    if (thews.readyState === 1) thews.send(JSON.stringify(msg));
  });
}

module.exports = {
  sendToUser,
  sendToGroups,
  sendToAll,
};
