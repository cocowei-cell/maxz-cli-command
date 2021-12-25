const { req } = require("../utils/req")
const chalk = require('chalk');
const inquire = require('inquirer');
const { loading } = require("../utils/ora");
module.exports = async function () {
  const spinner = loading();
  const { username = '' } = await inquire.prompt({
    type: 'input',
    name: "username",
    validate: function (input) {
      const done = this.async();
      const value = input?.trim()
      if (value === '') {
        done("Please Input Your username")
      } else {
        if (/^\d{6,10}$/.test(value)) {
          req({
            url: '/api/user/validate',
            method: 'post',
            data: {
              username: value
            }
          }).then((data) => {
            if (data.data === 1) {
              done(null, true)
            } else {
              done("该用户名已存在，请换一个")
            }
          });
        } else {
          done("请输入6-10位的数字")
        }
      }
    }
  })
  console.log(chalk.green("-----该用户名可用，请继续输入密码-----"));
  const { password1 = '' } = await inquire.prompt({
    type: 'password',
    name: "password1",
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
  console.log("请再次输入密码");
  const { password2 = '' } = await inquire.prompt({
    type: 'password',
    name: "password2",
    validate: function (input) {
      const done = this.async();
      if (input?.trim() === '') {
        done("Please Input Your password")
      } else {
        done(null, true)
      }
    }
  })
  if (password1 !== password2) {
    console.log(chalk.red("两次输入密码不一致！"));
  }
  spinner.start("注册中...")
   req({
    url: '/api/user/register',
    method: 'post',
    data: {
      username: username.trim(),
      password: password2.trim()
    }
  })
  spinner.succeed("注册完成，请使用mz login登录");
  process.exit(0);
}