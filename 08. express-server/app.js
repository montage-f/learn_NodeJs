const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser'); // 用来解析cookie
const logger = require('morgan'); // 生成日志, 写日志

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogsRouter = require('./routes/blogs');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json()); // 解析 post 请求
app.use(express.urlencoded({extended: false})); // 解析 post 的其他类型数据
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 将静态文件返回

// 给路由设置跟路径
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogsRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
