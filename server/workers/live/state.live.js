function liveState() {
  this.connmap = new Map(); // Which ws connection corresponds to which user
  this.groupMap = new Map(); // Which ws connection corresponds to which contest
  return this;
}

const out = liveState();

module.exports = out;
