/**
 * Created by MonTage_fz on 2019/6/15
 */
// 封装mysql的配置

// 获取node的环境变量
const env = process.env.NODE_ENV;

//
let MYSQL_CONF;
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'myblog'
    };
}

if (env === 'production') {
    // 写你线上的端口
    MYSQL_CONF = {};
}
module.exports = {
    MYSQL_CONF
};
