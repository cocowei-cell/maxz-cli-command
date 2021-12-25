const NET_CONFIG = {
  baseUrl: require('../config/mz.json').url,
}

const excludeCheck = ['/api/user/login', '/api/user/validate', '/api/user/register']

module.exports = {
  NET_CONFIG,
  excludeCheck
}