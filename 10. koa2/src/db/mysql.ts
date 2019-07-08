/**
 * Created by montage_fz on 2019-07-08
 */
import * as mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'blogs',

});
connection.connect((err) => {
    if (err) {
        console.log('mysql连接失败');
    }
});
const querySql = (str: string): object => {
    return new Promise((resolve) => {
        connection.query(str, (err, data) => {
            if (err) {
                console.log(err);
                resolve({
                    msg: '查询语句错误'
                });
                return;
            }
            resolve(data);
        });
    });
};
export default querySql;
