/**
 * Created by MonTage_fz on 2019/6/12
 */
const queryString = require('querystring');

const {login} = require('../controller/user');
const {SuccessModule, ErrorModule} = require('../module/resModule/baseModule');

// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toLocaleString();
};

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
        res.setHeader('Set-Cookie', `username=${req.body.username}; path=/; httpOnly; expires=${getCookieExpires()}`);
        return new SuccessModule(result[0], '登录成功');
        
    }
};

module.exports = handleUserRouter;
