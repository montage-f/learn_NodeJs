/**
 * Created by montage_fz on 2019-06-27
 */

const queryBlogTable = require('../db/connectMySql');

const getBlogList = async () => {
    const sql = `select * from users`;
    let result = await queryBlogTable(sql);
    console.log(result);
    return result;
};

const getBlogDetail = () => {
    return {
        message: '我是博客内容'
    };
};

const newBlog = () => {
    return {
        message: '新建博客'
    };
};
const updateBlog = () => {
    return {
        message: '更新博客'
    };
};
const deleteBlog = () => {
    return {
        message: '删除博客'
    };
};

module.exports = {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    deleteBlog
};
