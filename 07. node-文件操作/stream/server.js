/**
 * Created by montage_fz on 2019-07-02
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const fileName = path.resolve(__dirname, 'text1.txt');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const fileReadStream = fs.createReadStream(fileName);
        fileReadStream.pipe(res);
    }
    
});
server.listen(3000);
