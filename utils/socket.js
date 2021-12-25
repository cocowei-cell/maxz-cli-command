const io = require('socket.io-client');
const { NET_CONFIG } = require('../config');

const socket = io.connect(NET_CONFIG.baseUrl)
socket.on('err',(data)=>{
  console.log(data);
})
exports.getSocket = function () {
  return socket
}