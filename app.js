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
var morgan=require('morgan');


var app=express();

global.logger=log4js.getLogger();

app.engine('html',ejs.renderFile);

app.set('view engine','html');

app.set('views',__dirname+'/views');

app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan());

routes(app);

var port=3000;

app.listen(port,function () {
  logger.info('server start at port:'+port);
});

socket(app);

module.exports=app;