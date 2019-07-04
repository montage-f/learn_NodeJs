/**
 * Created by montage_fz on 2019-07-04
 */

const express = require('express');
const app = express();
app.use((req, res, next) => {
    console.log(`请求开始...${req.method}-${req.url}`);
    next();
    
});

app.use((req, res, next) => {
    // 假设在这里处理cookie
    req.cookie = {
        userId: 'abc123'
    };
    next();
    
});

app.use((req, res, next) => {
    // 假设处理postData, 异步处理
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        };
        next();
    });
});


app.use('/api', (req, res, next) => {
    console.log(`处理api路由`);
    next();
});

app.get('/api', (req, res, next) => {
    console.log(`处理get-api路由`);
    next();
});

app.post('/api', (req, res, next) => {
    console.log(`处理post-api路由`);
    next();
});
app.get('/api/cookie', (req, res, next) => {
    console.log(`处理/api/cookie路由`);
    res.json({
        data: req.cookie
    });
});

app.get('/api/post-data', (req, res, next) => {
    console.log(`处理/api/post-data路由`);
    res.json({
        data: req.body
    });
});
app.use((req, res, next) => {
    console.log(`处理404路由`);
    res.json({
        data: '处理404'
    });
});

app.listen(3000, () => {
    console.log(`http://127.0.0.1:3000/`);
});
