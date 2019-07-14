/**
 * Created by montage_fz on 2019-07-06
 */
const http = require('http');

class likeExpress {
    constructor() {
        this.routes = {
            all: [],
            get: [],
            post: []
        };
    }
    
    register(...rest) {
        // 通过传过来的第一个参数是否是字符串, 来对这个函数进行重载
        let info = {};
        if (typeof rest[0] === 'string') {
            info.path = rest[0];
            // 用于存放中间件信息
            info.stack = rest.slice(1);
        } else {
            info.path = '/';
            info.stack = rest.slice(0);
        }
        return info;
    }
    
    use(...rest) {
        const info = this.register(...rest);
        console.log(`userInfo:`, info);
        this.routes.all.push(info);
    }
    
    get(...rest) {
        const info = this.register(...rest);
        console.log(`getInfo:`, info);
        this.routes.get.push(info);
    }
    
    post(...rest) {
        const info = this.register(...rest);
        console.log(`postInfo:`, info);
        this.routes.post.push(info);
    }
    
    match(method, url) {
        let stack = [];
        if (url === '/favicon.ico') {
            return [];
        }
        let curRoutes = [];
        curRoutes = curRoutes.concat(this.routes.all);
        curRoutes = curRoutes.concat(this.routes[method]);
        curRoutes.forEach(routeInfo => {
            if (routeInfo.path.indexOf(url) === 0) {
                stack.push(...routeInfo.stack);
            }
        });
        return stack;
    }
    
    handle(req, res, resultList) {
        console.log(resultList);
        let next = () => {
            let middleWare = resultList.shift();
            if (middleWare) {
                middleWare(req, res, next);
            }
        };
        next();
    }
    
    callback(req, res) {
        res.json = (data) => {
            res.setHeader('Content-type', 'application/json');
            res.end(
                JSON.stringify(data)
            );
        };
        const url = req.url;
        const method = req.method.toLowerCase();
        const resultList = this.match(method, url);
        this.handle(req, res, resultList);
        
    }
    
    listen(...rest) {
        const server = http.createServer(this.callback.bind(this));
        server.listen(...rest);
    }
    
}

const app = new likeExpress();
app.get('/api', (req, res, next) => {
    res.json({
        msg: 'get'
    });
});


app.listen(9000, () => {
    console.log(`http://localhost:9000`);
});
