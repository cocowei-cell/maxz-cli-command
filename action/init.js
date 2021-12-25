// 创建新的项目  需要登录操作
const fs = require('fs');
const { join } = require("path");
module.exports = async function () {
  const cwd = process.cwd();
  fs.writeFileSync(`${cwd}/.mzignore`, '/node_modules');
  fs.createReadStream(join(__dirname, '../build.sh')).pipe(fs.createWriteStream(`${cwd}/build.sh`)).on('finish', () => {
    console.log("初始化成功！");
    process.exit(0);
  })
}