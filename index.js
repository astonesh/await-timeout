/**
 * Promise-based replacement for setTimeout / clearTimeout.
 */

class Timeout {
  constructor() {
    this._id = null;
  }

  set(ms, msg = '') {
    return new Promise((resolve, reject) => {
      const fn = msg ? () => reject(new Error(msg)) : resolve;
      this._id = setTimeout(fn, ms);
    });
  }

  clear() {
    clearTimeout(this._id);
  }
}

// Static `.set()` helper
Timeout.set = (ms, msg) => new Timeout().set(ms, msg);

export default Timeout;
