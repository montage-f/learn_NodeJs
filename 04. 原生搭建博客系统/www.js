/**
 * Created by MonTage_fz on 2019/6/12
 */
//
const http = require('http');
const serverHandle = require('./app');
const PORT = 3000;

const server = http.createServer(serverHandle);

server.listen(PORT, () => {
    console.log(`connect 3000 port`);
});
