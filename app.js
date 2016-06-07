var express=require('express');
var bodyParser=require('body-parser');
var session = require('express-session');
var cookieParser=require('cookie-parser');
var MongoStore=require('connect-mongo')(session);
var path=require('path');

var app=express();

app.get('/',function (req, res) {
  res.send('fuck you');
});

app.listen(80,function () {
  console.log('server start at port:'+80)
});

module.exports=app;