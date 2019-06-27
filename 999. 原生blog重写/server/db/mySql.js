/**
 * Created by montage_fz on 2019-06-27
 */
const mySql = require('mysql');

const connectMySql = mySql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'blogs',
});
connectMySql.connect();


const queryMySql = (sql) => new Promise((resolve, reject) => {
    connectMySql.query(sql, (err, data) => {
        if (!err) {
            console.log(`mysSqlData:${data}`);
            resolve(data);
        }
        resolve('数据库语句错误');
    });
});


module.exports = queryMySql;
