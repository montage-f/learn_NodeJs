/**
 * Created by MonTage_fz on 2019/6/12
 */
const http = require('http');
const queryString = require('querystring');
const server = http.createServer((req, res) => {
    console.log(req.method);
    const url = req.url;
    
    req.query = queryString.parse(url.split('?')[1]);
    console.log(url.split('?'));
    console.log(req.query);
    
    res.end(JSON.stringify(req.query));
});
server.listen(3000, () => {
    console.log(`connect 3000 port`);
});
