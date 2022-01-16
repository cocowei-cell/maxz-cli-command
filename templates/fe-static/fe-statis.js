module.exports = (port, CacheAge = 60 * 60 * 24) => {
  return `
  const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const compression = require('compression');
app.use(compression());
app.use((_, res, next) => {
  res.removeHeader("X-Powered-By")
  next()
})
app.use(express.static(path.resolve(__dirname, './public')))
app.use((_, res, next) => {
  res.setHeader('Cache-Control', 'max-age=${CacheAge}')
  next()
})
app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './public/index.html'), 'utf-8')
  res.send(html)
})
app.listen(${port}, () => {
  console.log("The Fe Server is listing on ${port}");
});
`
}


