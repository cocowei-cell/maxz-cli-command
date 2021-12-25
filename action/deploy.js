// deploy  部署操作
const { req } = require("../utils/req")
const chalk = require('chalk');
const { getForm } = require("../utils/file");
const fs = require('fs');
const path = require("path");
const inquire = require('inquirer');
const { getSocket } = require("../utils/socket");
const { compress } = require("../utils/compress");
const { join } = require("path");
module.exports = async function (projectName, port) {
  const v1 = projectName?.trim();
  const v2 = port?.trim();
  const cwd = process.cwd()
  const { data } = await req({
    url: '/api/project/check-project',
    method: 'post',
    data: {
      projectName: v1
    }
  })
  if (data.isExists) {
    const { isOveride } = await inquire.prompt({
      type: 'confirm',
      name: 'isOveride',
      message: "该项目已经存在，是否删除并重新部署？"
    })
    if (!isOveride) {
      return process.exit(0)
    }
  }
  try {
    fs.unlinkSync(join(cwd, `${v1}.zip`))
  } catch (error) {
  }
  const tag = await compress(v1);
  const form = getForm("/api/project/deploy", (err, res, body) => {
    if (err) {
      console.log(chalk.red("上传失败！"));
    } else {
      const data = JSON.parse(body);
      if (data.code === -1) {
        console.log(chalk.redBright(data.msg));
        process.exit(0)
      }
      console.log("上传成功！");
      fs.unlinkSync(join(cwd, `${v1}.zip`));
      const socket = getSocket();// 处理完毕后监听服务端部署流程

      socket.emit('deploy', {
        projectName: v1,
        port: v2
      })
      socket.on('data', (data) => {
        console.log(data);
      })
      socket.on('err', (data) => {
        console.log(data);
        process.exit(0);
      })
      socket.on('end', (data) => {
        console.log(data);
        process.exit(0);
      })
    }
  })
  
  if (tag) {
    form.append('file', fs.createReadStream(path.join(cwd, `${v1}.zip`)))
    form.append('projectName', v1);
    form.append('port', v2);
  } else {
    console.log(chalk.redBright("操作失败"));
    fs.unlinkSync(join(cwd, `${v1}.zip`));
    process.exit(0);
  }
}