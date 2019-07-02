/**
 * Created by montage_fz on 2019-07-02
 */
const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'a.txt');

/**
 *@param {fileName,content, option} 写入文件的路径, 写入的内容, 写入时的方法:a 代表追加, w 代表覆盖
 *@return {返回值类型} 返回值说明
 */
const writeFile = (fileName, content, option) => new Promise(resolve => {
    fs.writeFile(fileName, content, option, (err) => {
        if (err) {
            resolve(err);
        }
    });
});

writeFile(fileName, '我是追加的内容', {flag: 'a'});
