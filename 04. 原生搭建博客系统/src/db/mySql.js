/**
 * Created by MonTage_fz on 2019/6/15
 */
const mysql = require('mysql');
const {MYSQL_CONF} = require('../config/db');

// 创建链接
const mysqlConnection = mysql.createConnection(MYSQL_CONF);

// 链接数据库
mysqlConnection.connect();

// 统一执行 sql 的函数
const exec = (sql) => new Promise((resolve, reject) => {
    mysqlConnection.query(sql, (err, result) => {
        if (err) {
            reject(err);
        }
        resolve(result);
    });
});

// 由于我们是要重复引用这个函数, 所以我们就不关闭这个链接, 相当于一个单例模式
// mysqlConnection.end();

module.exports = {
    exec
};
