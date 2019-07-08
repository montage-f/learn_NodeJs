/**
 * Created by montage_fz on 2019-07-08
 */
import * as Router from 'koa-router';

const router = new Router();

router.get('/', (ctx, next) => {
    ctx.response.body = '欢迎来到首页';

});

export default router;
