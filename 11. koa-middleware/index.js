/**
 * Created by montage_fz on 2019-07-08
 */
const http = require('http');


function compose(middlewareList) {
    return (ctx) => {
        const dispatch = (i) => {
            const fn = middlewareList[i];
            try {
                return Promise.resolve(
                    fn(ctx, dispatch.bind(null, i + 1))
                );
            } catch (err) {
                return Promise.reject(err);
            }
        };
        dispatch(0);
    };
}

class LikeKoa {
    constructor() {
        this.middleware = [];
    }
    
    use(fn) {
        this.middleware.push(fn);
    }
    
    
    handleRequest(ctx, middleware) {
        middleware(ctx);
    }
    
    callback(req, res) {
        console.log(this.middleware);
        const fn = compose(this.middleware);
        const ctx = {req, res};
        this.handleRequest(ctx, fn);
    }
    
    listen(port, callback) {
        const server = http.createServer(this.callback.bind(this));
        server.listen(port, callback);
    }
}

const app = new LikeKoa();
app.use(async (ctx, next) => {
    console.log(`1-进`);
    await next();
    
    console.log(`1-出`);
});
app.use(async (ctx, next) => {
    console.log(`2-进`);
    await next();
    console.log(`2-出`);
});
app.use((ctx) => {
    ctx.res.end('结束');
});
app.listen(3000, () => {

});
