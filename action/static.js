const { exec } = require('child_process');
const fs = require('fs');
const { join, resolve } = require("path");
const feStatic = require('../templates/fe-static/fe-statis')
const excludeFileName = ['app.js',
  'node_modules',
  'package-lock.json',
  'package.json',
  'public']
module.exports = async function (port, cacheAge) {
  const cwd = process.cwd();
  fs.createReadStream(join(__dirname, '../templates/fe-static/package.json')).pipe(fs.createWriteStream(resolve(cwd, 'package.json'))).on('finish', () => {
    console.log("写入package.json成功");
    fs.writeFileSync(resolve(cwd, 'app.js'), feStatic(port, cacheAge))
    try {
      fs.mkdirSync(resolve(cwd, 'public'))
    } catch (error) {
    }
    exec('npm i').stdout.on('data', (data) => {
      console.log(data);
    }).on('end', () => {
      const dirs = fs.readdirSync(resolve(cwd))
      dirs.forEach((fileName) => {
        if (!excludeFileName.includes(fileName)) {
          // 移动文件到public下
          try {
            fs.renameSync(resolve(cwd, fileName), resolve(cwd, 'public', fileName))
          } catch (error) {
          }
        }
      })
      console.log("Gen Success");
      process.exit(0)
    })
  })
}