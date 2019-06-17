/**
 * Created by MonTage_fz on 2019/6/12
 */
    // 和server没有关系, 只是一个底层配置代码


// process.env.NODE_ENV
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getPostData = require('./src/getPostData');

// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toLocaleString();
};

// session 数据
let SESSION_DATA = {};

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');
    
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
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {};
        }
    } else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};
    }
    req.session = SESSION_DATA[userId];
    
    
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
