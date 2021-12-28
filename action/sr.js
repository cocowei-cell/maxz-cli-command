const { resolve } = require('path')
const registryDb = require('../db/registry.json');
const { execSync } = require("child_process");
const inquirer = require("inquirer");
const { writeFileSync } = require("fs");
function handleUseCommand(id) {
  const { registry } = registryDb.data.find((item) => {
    return item.id == id
  })
  execSync(`npm set registry ${registry}`)
  console.log(`设置为 ${registry} 成功！`);
  process.exit(0)
}
async function handleSetCommand(registry) {
  const data = registryDb.data
  const lastId = data[data.length - 1].id + 1 // 最后的id
  const { name } = await inquirer.prompt({
    type: 'input',
    name: "name",
    validate: function (input) {
      const done = this.async();
      const value = input?.trim()
      if (value === '') {
        done("Please Input Your name")
      } else {
        done(null, true)
      }
    }
  })
  const { registry_data } = await inquirer.prompt({
    type: 'input',
    name: "registry_data",
    validate: function (input) {
      const done = this.async();
      const value = input?.trim()
      if (value === '') {
        done("Please Input Your registry_data")
      } else {
        done(null, true)
      }
    }
  })
  data.push({
    id: lastId,
    name,
    registry: registry_data
  })
  writeFileSync(resolve('db', 'registry.json'), JSON.stringify(registryDb))
  console.log("添加成功！");
  process.exit(0)
}
function handleListCommand() {
  console.log(registryDb.data);
  process.exit(0)
}
const commaderMap = {
  use: handleUseCommand,
  set: handleSetCommand,
  list: handleListCommand
}
module.exports = async function (type = '', registry = '') {
  const handler = commaderMap[type]
  if (handler) {
    handler(registry)
  } else {
    console.log("命令支持 list use set");
  }
}