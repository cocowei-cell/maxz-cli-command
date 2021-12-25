const { req } = require("../utils/req")
const chalk = require('chalk');
const inquire = require('inquirer');
const { loading } = require("../utils/ora");
const store = require("../utils/store");
module.exports = async function () {
  const { username } = await inquire.prompt({
    type: 'input',
    name: "username",
    validate: function (input) {
      const done = this.async();
      const value = input?.trim()
      if (value === '') {
        done("Please Input Your username")
      } else {
        if (/^\d{6,10}$/.test(value)) {
          done(null, true)
        } else {
          done("请输入6-10位的数字")
        }
      }
    }
  })
  const { password = '' } = await inquire.prompt({
    type: 'password',
    name: "password",
    validate: function (input) {
      const done = this.async();
      const value = input?.trim()
      if (value === '') {
        done("Please Input Your password")
      } else {
        if (/^[0-9a-zA-Z]{6,12}$/.test(value)) {
          done(null, true)
        } else {
          done("请输入6-12位的小写字母和数字组合密码")
        }
      }
    }
  })
  const sp = loading()
  sp.start('登录中')
  const { data } = await req({
    url: '/api/user/login',
    method: 'post',
    data: {
      username: username.trim(),
      password: password.trim()
    }
  })
  store.saveStore("token", data.token);
  store.saveStore("username", data.username);
  store.saveStore("_id", data._id);
  sp.succeed('登录成功');
  process.exit(0)
}