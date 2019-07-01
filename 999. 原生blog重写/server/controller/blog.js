/**
 * Created by montage_fz on 2019-06-27
 */

const queryBlogTable = require('../db/connectMySql');

const checkParam = (req, keyArr) => {
    for (let key of keyArr) {
        if (!req.body[key]) {
            return {
                statue: 404,
                noKey: key
            };
        }
    }
};

const getBlogList = async (req) => {
    const {author} = req.body;
    let sql = `select * from blogs`;
    if (author) {
        sql = `select * from blogs where author='${author}'`;
    }
    return await queryBlogTable(sql);
};

const getBlogDetail = async (req) => {
    if (checkParam(req, ['id'])) return checkParam(req, ['id']);
    
    const {id} = req.body;
    let sql = `select * from blogs where id='${id}'`;
    return await queryBlogTable(sql);
    
};

const newBlog = async (req) => {
    if (checkParam(req, ['title', 'content'])) return checkParam(req, ['title', 'content']);
    
    const {title, content} = req.body;
    const author = req.session.author;
    const createTime = Date.now();
    const updateTime = null;
    const sql = `insert into blogs (title, content, createTime, updateTime,author) value ('${title}','${content}',${createTime},'${updateTime}','${author}')`;
    return await queryBlogTable(sql);
};

const updateBlog = async (req) => {
    const {id, title, content} = req.body;
    const author = req.session.author;
    const updateTime = Date.now();
    let sql = '';
    if (title) {
        sql = `update blogs set title='${title}', updateTime='${updateTime}' where id=${id} and author='${author}'`;
    }
    if (content) {
        sql = `update blogs set content='${content}', updateTime='${updateTime}' where id=${id} and author='${author}'`;
    }
    if (content && title) {
        sql = `update blogs set title='${title}', content='${content}', updateTime='${updateTime}' where id=${id} and author='${author}'`;
    }
    // 如果两个都没有, 就需要检验
    if (!content && !title) {
        return checkParam(req, ['title', 'content', 'title', 'content']);
    }
    return await queryBlogTable(sql);
};

const deleteBlog = async (req) => {
    if (checkParam(req, ['id'])) return checkParam(req, ['id']);
    
    const {id} = req.body;
    const author = req.session.author;
    let sql = `delete from blogs where id=${id} and author='${author}'`;
    
    return await queryBlogTable(sql);
};

module.exports = {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    deleteBlog
};
