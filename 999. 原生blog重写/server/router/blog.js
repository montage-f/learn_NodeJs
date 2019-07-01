/**
 * Created by montage_fz on 2019-06-27
 */
const queryString = require('querystring');
const {blog} = require('../controller');
const {
    successInfo: {
        SuccessInfo,
        ErrorInfo
    }
} = require('../middleware');

// 进行登录验证
const checkLogin = (req) => {
    if (!req.session.username) {
        return new ErrorInfo(null, '请先登录用户', 400);
    }
};

module.exports = async (req) => {
// 请求的方式
    const POST = req.method === 'POST';
    // url
    const url = req.url;
    const path = url.split('?')[0];
    
    const {getBlogList, getBlogDetail, newBlog, updateBlog, deleteBlog} = blog;
    // 博客列表-返回所有的博客
    if (POST && path === '/api/blog/list') {
        const isLogin = checkLogin(req);
        if (isLogin) {
            return isLogin;
        }
        
        const result = await getBlogList(req);
        return new SuccessInfo(result, '请求成功');
    }
    
    // 博客内容-返回对应作者的博客
    if (POST && path === '/api/blog/detail') {
        const isLogin = checkLogin(req);
        if (isLogin) {
            return isLogin;
        }
        
        const result = await getBlogDetail(req);
        if (result.statue === 404) return new ErrorInfo(`请输入参数${result.noKey}`);
        return new SuccessInfo(result, '请求成功');
    }
    
    // 新增博客
    if (POST && path === '/api/blog/new') {
        const isLogin = checkLogin(req);
        if (isLogin) {
            return isLogin;
        }
        
        const result = await newBlog(req);
        if (result.statue === 404) return new ErrorInfo(`请输入参数${result.noKey}`);
        return new SuccessInfo(result, '请求成功');
    }
    
    // 修改博客
    if (POST && path === '/api/blog/update') {
        const isLogin = checkLogin(req);
        if (isLogin) {
            return isLogin;
        }
        
        const result = await updateBlog(req);
        if (result.statue === 404) return new ErrorInfo(`请输入参数${result.noKey}`);
        return new SuccessInfo(result, '请求成功');
    }
    
    // 删除博客
    if (POST && path === '/api/blog/del') {
        const isLogin = checkLogin(req);
        if (isLogin) {
            return isLogin;
        }
        
        const result = await deleteBlog(req);
        if (result.statue === 404) return new ErrorInfo(`请输入参数${result.noKey}`);
        return new SuccessInfo(result, '删除成功');
    }
    
};
