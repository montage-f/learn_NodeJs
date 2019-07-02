/**
 * Created by montage_fz on 2019-07-02
 */

const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'a.txt');

// 判断文件是否存在

let result = fs.existsSync(fileName);
console.log(result);


