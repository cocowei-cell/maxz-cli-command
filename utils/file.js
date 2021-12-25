const request = require('request');
const fs = require('fs');
const store = require('./store');
// 下载文件
function downLoadFile(sourceUrl, targetUrl) {
  let writeStream = fs.createWriteStream(targetUrl);
  let readStream = request(sourceUrl);
  readStream.pipe(writeStream);
  return new Promise((resolve, reject) => {
    readStream.on('error', (err) => {
      writeStream.end();
      resolve(false);
    })
    readStream.on('end', () => {
      writeStream.end();
      resolve(true);
    });
  })
}

function getForm(url, cb) {
  return request.post({
    url: store.getStore('url') + url,
    headers: {
      token: store.getStore('token'),
      contentType: "application/zip",
    },
  }, cb).form()
}

module.exports = {
  downLoadFile,
  getForm
}