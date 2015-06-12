var API = require('./api');
var Entry = require('./entry');

class Log {
  constructor(log) {
    this.api = new API();
    this.entries = [];
    if (log) {
      this.url = log.logurl;
      this.id = log.logid;
    }
  }
  create() {
    return this.api.createLog().then(log => {
      this.url = log.logurl;
      this.id = log.logid;
    });
  }
  show() {
    return this.api.showLog(this.url).then(entries => {
      this.entries = entries.map(e => new Entry(this.id,e));
    });
  }
  addEntry(type, data) {
    var entry = new Entry(this.id);
    return entry.create(type, data).then(entry => {
      this.entries.push(new Entry(this.id, entry));
    });
  }
}

module.exports = Log;