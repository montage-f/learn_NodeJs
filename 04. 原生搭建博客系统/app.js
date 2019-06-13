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
    //
    getPostData(req).then(postData => {
        
        // 拿到前端交给后端的参数, 并放入到请求body里面
        req.body = postData;
        // 博客路由
        const blog = handleBlogRouter(req, res);
        if (blog) {
            res.end(JSON.stringify(blog));
            return;
        }
        
        // 用户路由
        const user = handleUserRouter(req, res);
        if (user) {
            res.end(JSON.stringify(user));
            return;
        }
        // 未命中路由
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.end('404');
    }).catch(err=>{
        res.end(JSON.stringify(err));
    });
    
};
module.exports = serverHandle;
