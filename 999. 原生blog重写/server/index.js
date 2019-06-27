/**
 * Created by montage_fz on 2019-06-27
 */

const router = require('./router');

module.exports = (req, res) => {
    res.writeHead(404, {'Content-type': 'application/json'});
    
    
    // users
    
    
    // blog
    const routerBlog = router.blog(req, res);
    if (routerBlog) {
        res.end(JSON.stringify(routerBlog));
        console.log(`routerBlog`, routerBlog);
        return;
    }
    res.writeHead(404, {'Content-type': 'text/plain'});
    res.end('404');
    
};
