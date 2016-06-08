var express=require('express');
var bodyParser=require('body-parser');
var session = require('express-session');
var cookieParser=require('cookie-parser');
var MongoStore=require('connect-mongo')(session);
var log4js=require('log4js');
var path=require('path');
var ejs=require('ejs');
var models=require('./models');
var socket=require('./socket');
var routes=require('./routes');


var app=express();

global.logger=log4js.getLogger();

app.engine('html',ejs.renderFile);

app.set('view engine','html');

app.set('views',__dirname+'/views');

app.use(express.static(path.join(__dirname, 'static')));

routes(app);

app.listen(80,function () {
  logger.info('server start at port:80');
});

socket(app);
module.exports=app;