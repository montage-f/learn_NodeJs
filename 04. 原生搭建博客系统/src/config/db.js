/**
 * Created by MonTage_fz on 2019/6/15
 */
// 封装mysql的配置

// 获取node的环境变量
const env = process.env.NODE_ENV;

// mySql 的配置
let MYSQL_CONF;

// redis 的配置
let REDIS_CONF;


if (env === 'dev') {
    // mySql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'myblog'
    };

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    };
}

if (env === 'production') {
    // 写你线上的端口
    MYSQL_CONF = {};

    REDIS_CONF = {};
}
module.exports = {
    MYSQL_CONF,
    REDIS_CONF
};
