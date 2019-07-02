/**
 * Created by montage_fz on 2019-07-02
 */
const fs = require('fs');
const path = require('path');


const fileName1 = path.resolve(__dirname, 'text1.txt');
const fileName2 = path.resolve(__dirname, 'text2.txt');

const readStream = fs.createReadStream(fileName1);

const writeStream = fs.createWriteStream(fileName2);

// 将读取的fileName1里面的文件, 倒入fileName2里面
readStream.pipe(writeStream);

readStream.on('data', (chunk) => {
    console.log('每次读取的内容=>', chunk.toString());
    
});
// 监听 end 事件, 来观察是否拷贝完成
readStream.on('end', () => {
    console.log('copy done');
});

