const fs = require('fs');
const compressing = require('compressing');
const { join } = require('path');
let content = '';
const cwd = process.cwd()
try {
  content = fs.readFileSync(join(cwd, '.mzignore'), 'utf-8');
} catch (error) {
  try {
    content = fs.readFileSync(join(cwd, '.gitignore'), 'utf-8');
  } catch (error) {
  }
}
if (content === '') {
  content = fs.readFileSync(join(__dirname, '../', '.conf'), 'utf-8');
}
function compress(project) {
  return new Promise((r) => {
    try {
      const zipStream = new compressing.zip.Stream();
      fs.readdirSync(cwd).forEach((p) => {
        content.includes(p) || zipStream.addEntry(join(cwd, p))
      })
      const destStream = fs.createWriteStream(cwd + "/" + project + '.zip');
      zipStream.pipe(destStream).on('finish', () => {
        r(true)
      });
    } catch (error) {
      r(false)
    }
  })
}

module.exports = {
  compress
}