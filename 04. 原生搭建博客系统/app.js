/**
 * Created by MonTage_fz on 2019/6/12
 */
    // 和server没有关系, 只是一个底层配置代码

// process.env.NODE_ENV
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getPostData = require('./src/getPostData');


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
    
    getPostData(req).then(async (postData) => {
        
        // 拿到前端交给后端的参数, 并放入到请求body里面
        req.body = postData;
        // 博客路由
        const blog = await handleBlogRouter(req, res);
        if (blog) {
            res.end(JSON.stringify(blog));
            return;
        }
        
        // 用户路由
        const user = await handleUserRouter(req, res);
        if (user) {
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
