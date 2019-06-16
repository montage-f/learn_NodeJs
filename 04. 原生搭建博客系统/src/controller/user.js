/**
 * Created by MonTage_fz on 2019/6/13
 */
const {exec} = require('../db/mySql');
const loginCheck = ({username, password}) => {
    const sql = `select username, password from users where username='${username}' and password='${password}'`;
    return exec(sql);
};

module.exports = {
    loginCheck
};
