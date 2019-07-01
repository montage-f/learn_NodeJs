/**
 * Created by montage_fz on 2019-06-27
 */
const {
    user: {
        queryUser
    }
} = require('../controller');

const {
    successInfo: {
        SuccessInfo,
        ErrorInfo
    }
} = require('../middleware');

const {redis_get, redis_set} = require('../db/connectRedis');


module.exports = async (req, res) => {
    const POST = req.method === 'POST';
    const url = req.url;
    const path = url.split('?')[0];
    
    
    if (POST && path === '/api/user/login') {
        const username = req.body.username;
        const password = req.body.password;
        if (!username) {
            return new ErrorInfo('请输入用户名');
        }
        if (!password) {
            return new ErrorInfo('请输入密码');
        }
        
        const result = await queryUser(username, password);
        if (result.length) {
            req.session.username = result[0].username;
            req.session.author = result[0].author;
            // 将登陆信息存入到session中
            console.log(req.userId);
            redis_set(req.userId, req.session);
            return new SuccessInfo({
                ...result[0],
                userId: req.userId
            }, '登陆成功');
        }
        return new ErrorInfo('该用户尚未注册!');
    }
};
