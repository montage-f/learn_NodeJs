/**
 * Created by MonTage_fz on 2019/6/12
 */
const queryString = require('querystring');
const {SuccessModule, ErrorModule} = require('../module/resModule/baseModule');
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const query = queryString.parse(url.split('?')[1]);
    
    // 获取-博客-列表
    if (method === 'GET' && path === '/api/blog/list') {
        const {author, keyword} = query;
        const data = getList(author, keyword);
        return new SuccessModule(data);
    }
    // 获取-博客-内容
    if (method === 'GET' && path === '/api/blog/detail') {
        const {id} = query;
        const data = getDetail(id);
        return new SuccessModule(data);
    }
    // 新建-博客-内容
    if (method === 'POST' && path === '/api/blog/new') {
        // 将前端的数据交给后端, 后端返回数据
        const data = newBlog(req.body);
        return new SuccessModule(data);
    }
    // 更新-博客-内容
    if (method === 'POST' && path === '/api/blog/update') {
        const isSuccess = updateBlog(req.body);
        if (isSuccess) {
            return new SuccessModule('更新成功');
        } else {
            return new ErrorModule('更新失败');
        }
    }
    // 删除-博客-内容
    if (method === 'POST' && path === '/api/blog/del') {
        const isSuccess = delBlog(req.body);
        if (isSuccess) {
            return new SuccessModule('删除成功!');
        } else {
            return new ErrorModule('删除失败!');
        }
    }
};
module.exports = handleBlogRouter;
