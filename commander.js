module.exports = [{
  command: 'create <type> <name>',
  description: '创建nest项目模块',
  usage: '用于创建模型名称',
  action: require('./action/create')
},
{
  command: 'login',
  description: '用于登录到远程服务器',
  usage: '用于登录到远程服务器',
  action: require('./action/login')
},
{
  command: 'reg',
  description: '注册',
  usage: '注册',
  action: require('./action/reg')
},
{
  command: 'new <projectName>',
  description: '创建新的项目名称',
  usage: '创建新的项目名称',
  action: require('./action/new')
},
{
  command: 'deploy <projectName> <port>',
  description: '发布项目',
  usage: '发布项目',
  action: require('./action/deploy')
}, {
  command: 'init',
  description: '初始化项目',
  usage: '初始化项目',
  action: require('./action/init')
}, {
  command: 'list [projectName]',
  description: '项目列表',
  usage: '项目列表',
  action: require('./action/list')
}, {
  command: 'config <type> <command>',
  description: '配置cli',
  usage: '配置cli',
  action: require('./action/config')
}, {
  command: 'static <port> [cacheAge]',
  description: '生成前端静态文件',
  usage: '生成前端静态文件',
  action: require('./action/static')
}, {
  command: 'sr <type> [registry]',
  description: '配置npm源',
  usage: '配置npm源',
  action: require('./action/sr')
}]
