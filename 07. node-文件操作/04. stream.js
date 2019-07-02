/**
 * Created by montage_fz on 2019-07-02
 */
const http = require('http');
const server = http.createServer((req, res) => {
    req.pipe(res);
});
server.listen(8000);
