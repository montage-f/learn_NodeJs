/**
 * Created by MonTage_fz on 2019/6/12
 */
const {exec} = require('../db/mySql');
// 获取博客列表
const getList = (author, keyword) => {
    // where 后面的 1, 用来站位, 防止在author,和keyword都没有的情况下, 与后面的sql语句拼接发生语法错误的问题
    let sql = `select * from blogs where 1 `;
    if (author) {
        sql += `and author='${author}'`;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }
    // 根据创建时间, 倒序排列
    sql += `order by createtime desc`;
    
    // 返回一个promise对象
    return exec(sql);
};

// 获取博客详情
const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}' `;
    return exec(sql);
    
};
// 新建博客
const newBlog = ({title, author, content}) => {
    const createTime = Date.now();
    let sql = `insert into blogs (title, content, author, createTime) values ('${title}' ,'${content}','${author}', ${createTime}) `;
    if (!title) {
        return `请填写title信息!`;
    }
    if (!author) {
        return `请填写author信息!`;
    }
    if (!content) {
        return `请填写content信息!`;
    }
    return exec(sql);
};
// 更新博客
const updateBlog = ({id, title, content}) => {
    const sql = `update blogs set title='${title}', content='${content}' where id='${id}'`;
    return exec(sql);
};
// 删除博客
const delBlog = ({id, author}) => {
    const sql = `delete from blogs where id=${id} and author='${author}'`;
    return exec(sql);
};
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
};
