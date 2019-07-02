/**
 * Created by MonTage_fz on 2019/6/12
 */
const http = require('http');
const queryString = require('querystring');
const server = http.createServer((req, res) => {
    // 告诉前端返回的数据类型是json格式
    res.setHeader('Content-type', 'application/json');
    
    const url = req.url;
    const method = req.method;
    const path = url.split('?')[0];
    const query = queryString.parse(url.split('?')[1]);
    
    let data = {
        url,
        method,
        path,
        query,
    };
    if (method === 'GET') {
        // 这里只允许是字符串, 但是字符串的格式是json
        console.log('get', data);
        res.end(JSON.stringify(data));
    } else if (method === 'POST') {
        let postData = '';
        req.on('a.txt', (chunk) => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            data = {
                ...data,
                postData
            };
            console.log('post', data);
            res.end(JSON.stringify(data));
        });
    }
});
server.listen(3000, () => {
    console.log(`connect 3000 port!`);
});
