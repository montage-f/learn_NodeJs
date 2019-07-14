/**
 * Created by montage_fz on 2019-07-08
 */

import * as Router from 'koa-router';

const router = new Router();
router.prefix('/api/blogs');

// 获取博客列表
router.get('/list', (ctx, next) => {
    ctx.body = '获取博客列表';

});
// 获取博客详情

// 删除博客


export default router;
