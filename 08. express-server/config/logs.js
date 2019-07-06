/**
 * Created by montage_fz on 2019-07-02
 */
const fs = require('fs');
const path = require('path');


// 要写入的文件名字
const createWriteStream = (fileName) => {
    // 获取到要将日志写入的文件路径
    const fullFileName = path.join(__dirname, '../', 'logs', fileName);
    
    return fs.createWriteStream(fullFileName, {flags: 'a'});
};

const access = (log,fileName) => {
    const accessStream = createWriteStream(fileName);
    accessStream.write(`${log}\n`);
};

module.exports = {
    access
};
