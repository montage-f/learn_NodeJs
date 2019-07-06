const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser'); // 用来解析cookie
const logger = require('morgan'); // 生成日志, 写日志


const session = require('express-session'); // session
const redisStore = require('connect-redis')(session);
const redisClient = require('./db/Redis');

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

const sessionStore = new redisStore({
    client: redisClient
});
app.use(session({
    secret: '123456',// 密匙
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,// 24小时后, cookie失效
    },
    store:sessionStore
}));


// 给路由设置跟路径
app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/blog', blogsRouter);
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
