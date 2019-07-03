/**
 * Created by montage_fz on 2019-07-03
 */
// node自带加密包
const crypto = require('crypto');

// 密匙
const SECRET_KEY = '123456';

const md5 = (content) => {
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
};

// 加密函数
const genPassword = (password) => {
    const str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
};

let str = genPassword('123');
console.log(str);
