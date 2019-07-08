/**
 * Created by montage_fz on 2019-07-08
 */
import queryMysql from '../db/mysql';

const login = (username: string, password: string): object => {
    let str: string = `select * from users where username='${username}' and password='${password}'`;
    return queryMysql(str);
};

export {
    login
};
