/**
 * Created by MonTage_fz on 2019/6/12
 */
const queryString = require('querystring');

const {login} = require('../controller/user');
const {SuccessModule, ErrorModule} = require('../module/resModule/baseModule');
const {redis_set} = require('../db/Redis');

const handleUserRouter = async (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const query = queryString.parse(url.split('?')[1]);
    
    // 登录
    if (method === 'GET' && path === '/api/user/login') {
        let result = await login(query);
        if (!result.length) {
            return new ErrorModule('登录失败');
        }
        // 后端设置cookie, 然后, 每次访问接口的时候, 浏览器都会带着这个cookie上来,
        // path=/ 表示 / 下面的所有路径都可以获取cookie
        // httpOnly 表示, 只允许服务端修改cookie
        // expires 表示 设置cookie的过期时间
        
        // res.setHeader('Set-Cookie', `username=${req.body.username}; path=/; httpOnly; expires=${getCookieExpires()}`);
        
        // 设置session值
        req.session.username = result[0].username;
        req.session.password = result[0].password;
        console.log(`req.session`, req.session);
        // 登录之后将对应的id设置session, 这样下次进来的时候, 先去查id有没有, 有的话, 就不用登陆, 直接进入
        redis_set(req.sessionId, req.session);
        return new SuccessModule(result[0], '登录成功');
        
    }
    
    if (method === 'GET' && path === '/api/user/login-test') {
        if (req.session.username) {
            return new SuccessModule(req.session, '登录成功');
        }
        return new ErrorModule('登录失败');
    }
};

module.exports = handleUserRouter;
