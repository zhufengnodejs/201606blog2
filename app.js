var express = require('express');
//用来处理路径 join 连接路径    resolve从当前路径出发，得到绝对路径
var path = require('path');
//收藏夹图标
var favicon = require('serve-favicon');
//记录请求日志的  请求的url地址  请求方法名 响应的时间 响应体大小
var logger = require('morgan');
//解析cookie req.cookies>它会把请求头中cookie取出来，name=zfpx; age=6,
//然后把它转成对象，赋给req.cookies ,使用querystring.parse模块转换
var cookieParser = require('cookie-parser');
//引入session中间件
var session = require('express-session');
//解析请求体的 req.body
var bodyParser = require('body-parser');
require('./db');
var routes = require('./routes/index');
var user = require('./routes/user');
//导入文章路由模块
var article = require('./routes/article');
var flash = require('connect-flash');
var app = express();

// view engine setup  设置模板引擎
//设置模板的存放目录
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎为html
app.set('view engine', 'html');
//如果是html模板，使用ejs的方法来进行渲染
app.engine('html',require('ejs').__express);
// uncomment after placing your favicon in /public
//当客户端访问 /favicon.ico路径的时候，返回 public/favicon.ico文件
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// dev是格式的一种 请求的方法 请求路径 响应状态码 响应时间 响应体的大小
app.use(logger('dev'));
//解析json格式的请求体
app.use(bodyParser.json());
//解析查询字符串格式的请求 key=value&key2=value2
// extended true ,把查询字符串转对象用querystring模块
// 如果有false,使用bodyParser自己写的一个转换方法
app.use(bodyParser.urlencoded({ extended: false }));
//解析cookie
app.use(cookieParser());
//使用了session中间件之后，会多了一个 req.session 对象属性
app.use(session({
  resave:true,//每次请求都要重新保存session
  saveUninitialized:true,//保存示初始化的session
  secret:'zfpx'
}));
//使用flash插件之后 req.flash
app.use(flash());
//静态文件中间件 当请求到来的时候先去public目录下找，找到
//就返回，找不到则则继续next
app.use(express.static(path.join(__dirname, 'public')));
// 第一个参数表示以这个路径开头
app.use('/', routes);
//       /users/add
app.use('/user', user);
app.use('/article', article);
// catch 404 and forward to error handler
// 捕获404错误并转到错误处理中间件
// 如果走到这里意味着静态文件中间件，路由也没有匹配上
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;//设置错误状态码
  next(err);//next如果传了错误对象会交由错误中间件来处理
});

// error handlers

// development error handler 开发时的错误处理器
// will print stacktrace 将打印详细错误
if (app.get('env') === 'development') {
  //没有调用next,所以不会继续执行了
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler 生产环境的错误处理
// no stacktraces leaked to user 不向终端用户泄露错误信息
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
