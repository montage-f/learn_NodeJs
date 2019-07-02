/**
 * Created by MonTage_fz on 2019/6/12
 */
const fs = require('fs');
const path = require('path');
const fullFileName = path.resolve(__dirname, 'files', 'a.json');
console.log('fullFileName', fullFileName);
fs.readFile(fullFileName, (err, data) => {
    if (err) {
        console.log(`err`, err);
        return;
    }
    console.log('a.txt', data.toString());
});

const readFile = (fileName, callback) => {
    const filePath = path.resolve(__dirname, 'files', fileName);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log('err', err);
            return;
        }
        callback(JSON.parse(data));
    });
};
// 回调处理异步
readFile('a.json', (a) => {
    console.log('a', a);
    readFile(a.next, (b) => {
        console.log('b', b);
        readFile(b.next, (c) => {
            console.log('c', c);
        });
    });
});


// promise 处理异步
const promiseReadFile = (fileName) => new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, 'files', fileName);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            reject(err);
        }
        resolve(JSON.parse(data));
        
    });
});
promiseReadFile('a.json').then((data) => {
    console.log('Pa', data);
    return promiseReadFile(data.next);
}).then((data) => {
    console.log('Pb', data);
    return promiseReadFile(data.next);
}).then((data) => {
    console.log('Pc', data);
});
