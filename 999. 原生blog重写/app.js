/**
 * Created by montage_fz on 2019-06-27
 */

const http = require('http');
const server = require('./server');


const app = http.createServer(server);


app.listen(4000, () => {
    console.log(`server port http://localhost:4000`);
});






