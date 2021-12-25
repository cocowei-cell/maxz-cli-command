// 创建新的项目  需要登录操作
const { req } = require("../utils/req")
const chalk = require('chalk');
module.exports = async function (projectName = '') {
  const v = projectName?.trim();
  const { data } = await req({
    url: '/api/project/create',
    method: 'post',
    data: {
      projectName: v
    },
    self: true
  })
  if (data === -1) {
    console.log(chalk.red("项目名已存在..."));
  } else {
    console.log(chalk.greenBright(v + "创建成功"));
  }
  process.exit(0)
}