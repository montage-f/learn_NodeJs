/**
 * Created by montage_fz on 2019-06-27
 */

const router = require('./router');

const {redis_set, redis_get} = require('./db/connectRedis');

const postBody = (req) => new Promise(resolve => {
    let postData = null;
    req.on('data', (chunk) => {
        postData = chunk.toString();
    });
    req.on('end', () => {
        if (!postData) {
            resolve(null);
        }
        resolve(JSON.parse(postData));
    });
});

module.exports = async (req, res) => {
    // 当使用了写入writeHead的时候, 后面就不能再次使用serHeader了
    res.setHeader('Content-type', 'application/json');
    // 获取cookie
    let cookie = req.headers.cookie || '';
    // 解析cookie
    req.cookie = {};
    cookie.split(';').forEach((item) => {
        const [key, value] = item.split('=');
        req.cookie[key] = value;
    });
    // 如果没有cookie就给他设置一个cookie
    let userId = req.userId = req.cookie['userId'] || `${Date.now()}_${Math.random()}`;
    let hasCookie = false;
    if (!req.cookie['userId']) {
        redis_set(userId, {});
        req.session = {};
        req.userId = userId;
        hasCookie = true;
        
    }
    const sessionInfo = await redis_get(userId);
    if (!sessionInfo) {
        req.session = {};
    } else {
        req.session = sessionInfo;
        console.log(`session:${req.session}`);
    }
    
    // 拿到post请求的参数
    const body = await postBody(req);
    if (body) {
        req.body = body;
    } else {
        req.body = {};
    }
    const routerUser = await router.user(req, res);
    if (routerUser) {
        if (hasCookie) {
            res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;`);
        }
        
        res.end(JSON.stringify(routerUser));
        return;
    }
    
    // blog
    const routerBlog = await router.blog(req, res);
    
    if (routerBlog) {
        if (hasCookie) {
            res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;`);
        }
        res.end(JSON.stringify(routerBlog));
        return;
    }
    res.writeHead(404, {'Content-type': 'text/plain'});
    res.end('404');
    
};
