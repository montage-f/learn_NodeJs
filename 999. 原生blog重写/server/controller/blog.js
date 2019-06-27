/**
 * Created by montage_fz on 2019-06-27
 */

const queryBlogTable = require('../db/mySql');
// console.log(`queryBlogTable:${queryBlogTable}`);

const getBlogList = () => {
    return [
        {
            message: '我是博客列表'
        }
    ];
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
