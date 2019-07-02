/**
 * Created by MonTage_fz on 2019/6/12
 */

const http = require('http');
const server = http.createServer((req, res) => {
    const requestMethod = req.method;
    if (requestMethod === 'POST') {
        // 数据格式
        console.log(`content-type:${req.headers['content-type']}`);
        // 接收数据
        let postData = '';
        req.on('a.txt', chunk => {
            // chunk 是二进制
            postData += chunk.toString();
        });
        req.on('end', () => {
            console.log(postData);
            res.end('method is post');
        });
        
    } else {
        res.end('method is get');
    }
    
});
server.listen(3000, () => {
    console.log(`connect 3000 port!`);
});
