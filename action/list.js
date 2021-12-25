const { req } = require('../utils/req');
const Table = require('cli-table');
module.exports = async function (projectName = "") {
  const { data = [] } = await req({
    url: '/api/project/list',
    method: 'get',
    params: {
      projectName
    }
  })
  if (data[0] === null) {
    console.log("查询不到该项目");
    process.exit(0)
  }
  const table = new Table({
    head: ['project_name', 'port'],
  })
  table.push(...data.map(({ project_name, port }) => ([project_name, port || 'none'])))
  console.log(table.toString());
  process.exit(0)
}