/**
 * Created by montage_fz on 2019-07-02
 */
// 文件操作
const fs = require('fs');
// 路径操作
const path = require('path');

const fileName = path.resolve(__dirname, 'a.txt');
console.log(fileName);

// 读取文件
const readFile = (fileName) => new Promise(resolve => {
    fs.readFile(fileName, (err, data) => {
        if (!err) {
            resolve(data);
            return;
        }
        console.error(err);
    });
});
readFile(fileName).then(data => {
    // 格式化二进制数据
    console.log(data.toString(), '读取文件');
});

// 写入文件
/**
 *@method writeFile
 *@param {fileName, content, option} 文件名, 写入内容, 写入的方式: a, 追加. w, 覆盖
 *@return {返回值类型} 返回值说明
 */
const writeFile = (fileName, content, option) => new Promise(resolve => {
    fs.writeFile(fileName, content, option, (err) => {
        if (err) {
            resolve(err);
        }
    });
});

writeFile(fileName, '我是追加的文件\n', {flag: 'a'});
