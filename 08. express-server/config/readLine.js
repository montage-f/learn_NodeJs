/**
 * Created by montage_fz on 2019-07-03
 */
const path = require('path');
const fs = require('fs');
// node自带包, 读取文件, 逐行读取
const readLine = require('readline');

// 获取要读取的文件名
const fileName = path.join(__dirname, '../', 'logs', 'access.log');

// 创建读取文件流
const readStream = fs.createReadStream(fileName);

// 创建readline对象
const rl = readLine.createInterface({
    input: readStream
});

let chromeNum = 0;
let sum = 0;

rl.on('line', (lineData) => {
    sum++;
    if (!lineData) {
        return;
    }
    let arr = lineData.split('--');
    if (arr[3] && arr[3].includes('Chrome')) {
        chromeNum++;
    }
});
rl.on('close', () => {
    console.log(`chrome占比:${chromeNum / sum}`);
});





