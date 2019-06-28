/**
 * Created by montage_fz on 2019-06-27
 */

const queryMySql = require('../db/connectMySql');
const queryUser = async (username, password) => {
    let sql = `select * from users where username='${username}' and password='${password}'`;
    return await queryMySql(sql);
};

module.exports = {
    queryUser
    
};
