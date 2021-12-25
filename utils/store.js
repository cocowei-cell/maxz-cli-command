const conf = require('../config/mz.json');
const fs = require('fs');
const path = require('path')
function getStore(key) {
  return conf[key]
}
function saveStore(key, value) {
  const obj = conf;
  obj[key] = value;
  fs.writeFileSync(path.join(__dirname, '../config', 'mz.json'), JSON.stringify(obj))
  return true;
}
const store = {
  getStore,
  saveStore
}
module.exports = store
