/**
 * Created by MonTage_fz on 2019/6/12
 */
const queryString = require('querystring');

const {loginCheck} = require('../controller/user');
const {SuccessModule, ErrorModule} = require('../module/resModule/baseModule');

const handleUserRouter = async (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const query = queryString.parse(url.split('?')[1]);
    
    // 登录
    if (method === 'POST' && path === '/api/user/login') {
        let result = await  loginCheck(req.body);
        if (!result.length) {
            return new ErrorModule('登录失败');
        }
        return new SuccessModule(result[0], '登录成功');
        
    }
};

module.exports = handleUserRouter;
