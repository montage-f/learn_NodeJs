/**
 * Created by MonTage_fz on 2019/6/12
 */
    // 和server没有关系, 只是一个底层配置代码


// process.env.NODE_ENV
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getPostData = require('./src/getPostData');

const {redis_set, redis_get} = require('./src/db/Redis');

// 引入日志
const {access} = require('./src/config/logs');
// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toLocaleString();
};


const serverHandle = async (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');
    
    // 写入日志
    access(`${req.method}--${req.url}--${Date.now()}--${req.headers['user-agent']}`, 'access.log');
    // 解析cookie,
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';  // k1=v1; k2=v2; k3=v3
    cookieStr.split(';').forEach(v => {
        const [key, value] = v.split('=');
        req.cookie[key] = value;
    });
    
    // 解析session
    let needSetCookie = false;
    let userId = req.cookie.userId;
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        redis_set(userId, {});
    }
    
    req.sessionId = userId;
    let redisData = await redis_get(req.sessionId);
    // 如果没有这个id, 就给这个session设置为空
    if (!redisData) {
        redis_set(req.sessionId, {});
        req.session = {};
    } else {
        req.session = redisData;
    }
    getPostData(req).then(async (postData) => {
        // 拿到前端交给后端的参数, 并放入到请求body里面
        req.body = postData;
        // 博客路由
        const blog = await handleBlogRouter(req, res);
        if (blog) {
            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
            }
            res.end(JSON.stringify(blog));
            return;
        }
        
        // 用户路由
        const user = await handleUserRouter(req, res);
        if (user) {
            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
            }
            res.end(JSON.stringify(user));
            return;
        }
        // 未命中路由
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.end('404');
    }).catch(err => {
        res.end(JSON.stringify(err));
    });
    
};
module.exports = serverHandle;
