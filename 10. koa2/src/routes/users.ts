/**
 * Created by montage_fz on 2019-07-08
 */
import * as Router from 'koa-router';
import {login} from '../controller/users';
import {SuccessInfo, ErrorInfo} from '../module/responseInfo';
import {addToken, decodeToken} from '../module/setToken';

const router = new Router();

router.post('/api/user/login', async (ctx, next) => {
    const {username, password} = ctx.request.body;
    if (!username) {
        ctx.response.body = new ErrorInfo('请输入用户名!');
        return;
    }
    if (!password) {
        ctx.response.body = new ErrorInfo('请输入密码!');
        return;
    }
    const data = await login(username, password);

    const token = addToken({
        username
    });

    if (data[0]) {
        ctx.response.body = new SuccessInfo({
            username: data[0].username,
            author: data[0].author,
            token
        }, '登录成功');
        return;
    }
    ctx.response.body = new ErrorInfo('该用户未注册!');
});

router.post('/api/test-token', (ctx, next) => {
    const token = ctx.request.header.token;
    let {iat, exp} = decodeToken(token);
    if (exp && exp <= Math.floor(Date.now() / 1000)) {
        ctx.response.body = new ErrorInfo('当前用户需要重新登录');
        return;
    }
    ctx.response.body = new SuccessInfo({
        token
    });
});
export default router;
