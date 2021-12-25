const axios = require('axios').default
const qs = require('qs')
const { NET_CONFIG, excludeCheck } = require('../config/index');
const conf = require('../config/mz.json');
const chalk = require('chalk');
const { loading } = require('./ora')
const l = loading()
const instance = axios.create({
  baseURL: NET_CONFIG.baseUrl,
  timeout: 8000
})
instance.interceptors.request.use((config) => {
  const token = conf.token;
  if (conf.url.trim() === '') {
    console.log(chalk.red("请先使用 mz config url 配置远程服务器地址"));
    process.exit(0)
  }
  // 校验token
  if (!excludeCheck.includes(config.url) && token === '') {
    console.log(chalk.red("请先登录！"));
    process.exit(0)
  }
  let { headers } = config;
  if (token) {
    headers = {
      ...headers,
      token,
    };
  }
  if (headers['Content-Type'] !== 'multipart/form-data') {
    config.data = qs.stringify(config.data);
  }
  config.headers = headers;
  l.start("questing...")
  return config;
})

instance.interceptors.response.use((data) => {
  l.succeed("Done")
  return data
})

function req(options = { url: '', method: '', data: {}, params: {} }, errCb = () => null) {
  return new Promise((resolve, reject) => {
    instance(options).then((data) => {
      if (data.data?.code == -1 || data.data?.code >= 400 || data.status >= 400) {
        errCb(data.data)
        console.log(chalk.red(data.data.msg));
        process.exit(0)
      }
      resolve(data.data)
    }).catch((err) => {
      errCb(err.message)
      console.log(chalk.red(err.message));
      process.exit(0)
    })
  })
}

exports.req = req;