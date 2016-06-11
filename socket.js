module.exports = function (app) {
  
  var server = require('http').Server(app);
  var socketIO = require('socket.io')(server);

  server.listen(3000);
  

  global.notification = socketIO.on('connection', function (socket) {
    logger.debug('socket connect success');
  });
};
