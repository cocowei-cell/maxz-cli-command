const fs = require('fs');
const store = require('../utils/store');
function handleUrl(url) {
  return store.saveStore("url", url) ? '设置成功' : 'error';
}
const typeObj = {
  "url": handleUrl
}
module.exports = function (type, command) {
  const fn = typeObj[type];
  if (!fn) {
    console.log("请输入正确的命令");
  } else {
    console.log(fn(command));
  }
  process.exit(0);
}