/**
 * Created by montage_fz on 2019-06-27
 */
const queryString = require('querystring');
const {blog} = require('../controller');

module.exports = (req, res) => {
// 请求的方式
    const POST = req.method === 'POST';
    const GET = req.method === 'GET';
    // url
    const url = req.url;
    const path = url.split('?')[0];
    const query = queryString.parse(url.split('?')[1]);
    console.log(path);
    
    const {getBlogList, getBlogDetail, newBlog, updateBlog, deleteBlog} = blog;
    // 博客列表
    if (GET && path === '/api/blog/list') {
        const result = getBlogList();
        console.log(`result`, result);
        return result;
    }
    
    // 博客内容
    if (GET && path === '/api/blog/detail') {
        const result = getBlogDetail();
        return result;
    }
    
    // 新增博客
    if (POST && path === '/api/blog/new') {
        const result = newBlog();
        return result;
    }
    
    // 修改博客
    if (POST && path === '/api/blog/update') {
        const result = updateBlog();
        return result;
    }
    
    // 删除博客
    if (POST && path === '/api/blog/del') {
        const result = deleteBlog();
        return result;
    }
    
};
