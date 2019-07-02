/**
 * Created by MonTage_fz on 2019/6/13
 */
module.exports = (req, res) => new Promise((resolve, reject) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    
    // 只有下面两个接口可以使用get请求
    const getUrl = ['/api/blog/list', '/api/blog/detail','/api/user/login','/api/user/login-test'];
    if (method !== 'POST' && !getUrl.includes(path)) {
        reject({
            msg: '该接口只能使用POST请求'
        });
    }
    
    let postData = null;
    req.on('a.txt', (chunk) => {
        postData = chunk.toString();
    });
    req.on('end', () => {
        if (!postData) {
            resolve({
                msg: '请传入参数'
            });
        }
        resolve(JSON.parse(postData));
    });
});
