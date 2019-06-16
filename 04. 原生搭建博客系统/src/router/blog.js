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

const handleBlogRouter = async (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const query = queryString.parse(url.split('?')[1]);
    
    // 拿到登录的作者, 然后将作者放入到请求体里面, 方便其他地方调用
    let author = 'lisi';
    req.body.author = author;
    
    // 获取-博客-列表
    if (method === 'GET' && path === '/api/blog/list') {
        const {author, keyword} = query;
        const data = await getList(author, keyword);
        return new SuccessModule(data);
    }
    // 获取-博客-内容
    if (method === 'GET' && path === '/api/blog/detail') {
        const {id} = query;
        const data = await getDetail(id);
        if (!data[0]) {
            data[0] = '暂无数据';
        }
        return new SuccessModule(data[0]);
    }
    // 新建-博客-内容
    if (method === 'POST' && path === '/api/blog/new') {
        // 将前端的数据交给后端, 后端返回数据
        // 我们需要将 content 博客内容, title 博客标题, author 博客作者传给后端
        // 这里需要注意的一点是, author是登录之后才可以拿到
        
        let data = await newBlog(req.body);
        if (data !== 'string') {
            data = {
                id: data.insertId,
            };
        }
        return new SuccessModule(data);
    }
    // 更新-博客-内容
    if (method === 'POST' && path === '/api/blog/update') {
        const {affectedRows} = await updateBlog(req.body);
        if (affectedRows) {
            return new SuccessModule('更新成功');
        } else {
            return new ErrorModule('更新失败');
        }
    }
    // 删除-博客-内容
    if (method === 'POST' && path === '/api/blog/del') {
        const {affectedRows} =await delBlog(req.body);
        if (affectedRows) {
            return new SuccessModule('删除成功!');
        } else {
            return new ErrorModule('删除失败!');
        }
    }
};
module.exports = handleBlogRouter;
