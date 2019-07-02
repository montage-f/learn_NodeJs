/**
 * Created by montage_fz on 2019-07-02
 */
const fs = require('fs');

const path = require('path');

// 拿到该文件的绝对路径
const fileName = path.resolve(__dirname, 'a.txt');
/**
 *@param {fileName} 要读取的文件路径
 *@return {string}
 */
const readFile = (fileName) => new Promise(resolve => {
    fs.readFile(fileName, (err, data) => {
        if (!err) {
            // 读取完成之后, 返回的是二进制文件, 这里需要转换成字符串
            resolve(data.toString());
        }
        resolve(err);
    });
});
readFile(fileName).then(v => {
    console.log(v);
});




