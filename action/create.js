const fs = require('fs')
const modelTemplate = require('../templates/model');
const { getService, getModule, getController } = require('../templates/module')
const chalk = require('chalk')
function handleModel(name = '') {
  if (name == "") {
    return console.log(chalk.red("请输入模型名称！"))
  }
  try {
    const dir = process.cwd();
    const content = modelTemplate(name.trim())
    const modelDir = `${dir}/src`;
    try {
      fs.mkdirSync(modelDir + "/models");
    } catch (error) {
    }
    fs.writeFileSync(`${modelDir}/models/${name}.ts`, content)
    console.log(`${chalk.green(`生成${name}成功！`)}`);
  } catch (error) {
    console.log(chalk.red("请在nest cli生成的项目下使用"))
  }
}

function handleModule(name = "") {
  if (name == "") {
    return console.log(chalk.red("请输入模块名称！"))
  }
  const Uppername = name[0].toUpperCase() + name.substr(1);
  try {
    const dir = process.cwd();
    const moduleDir = `${dir}/src`;
    let isExists = false;
    try {
      fs.mkdirSync(moduleDir + "/modules");
    } catch (error) {
    }
    try {
      fs.mkdirSync(moduleDir + "/modules/" + name);
    } catch (error) {
      isExists = true;
    }
    if (isExists) return console.log("目录下已经有该文件");;
    fs.writeFileSync(`${moduleDir}/modules/${name}/${name}.controller.ts`, getController(name))
    fs.writeFileSync(`${moduleDir}/modules/${name}/${name}.module.ts`, getModule(name))
    fs.writeFileSync(`${moduleDir}/modules/${name}/${name}.service.ts`, getService(name))
    try {
      const appContent = fs.readFileSync(`${moduleDir}/app.module.ts`, 'utf-8');
      const ImportTem = `import { ${Uppername}Module } from './modules/${name}/${name}.module';\n\n`
      const index = appContent.match(/@Module/).index; // 在这里插入import
      const result = (appContent.substring(0, index - 1) + ImportTem + appContent.substring(index)).replace(/(\])/, `, ${Uppername}Module]`)
      fs.writeFileSync(`${moduleDir}/app.module.ts`, result);
      console.log(`${chalk.green(`生成${name} Module成功！`)}`);
    } catch (error) {
      console.log("不存在app.module.ts文件");
    }
  } catch (error) {
    console.log(chalk.red("请在nest cli生成的项目下使用"));
  }
}

module.exports = function (type, name) {
  if (type === 'model') {
    handleModel(name)
  } else if (type === "module") {
    handleModule(name);
  } else {
    console.log(chalk.red(`暂时无法支持${type}类型的创建!\n`));
  }
  process.exit(0);
}