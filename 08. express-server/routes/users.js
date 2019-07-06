const express = require('express');
const router = express.Router();
const {login} = require('../controller/user');
const {
    successInfo: {
        SuccessInfo,
        ErrorInfo
    }
} = require('../middleware');

// 在浏览器端, 127.0.0.1 和localhost 被当成是两个地址, 视为跨域
/* GET users listing. */
router.post('/login', async function (req, res, next) {
    const result = await login(req.body);
    console.log(result);
    if (!result.length) {
        res.json(
            new ErrorInfo('登录失败')
        );
        return;
    }
    console.log(req.session, 222);
    if (result[0].username) {
        req.session.username = result[0].username;
        console.log(req.session);
        req.session.author = result[0].author;
    }
    res.json(
        new SuccessInfo(result[0], '登录成功')
    );
});


router.get('/login-test', async (req, res) => {
    console.log(req.session);
    if (req.session.username) {
        res.json(
            {
                msg: '登录成功!'
            }
        );
        return;
    }
    res.json({
        msg: '未登录'
    });
});

router.get('/test-session', async (req, res) => {
    const session = req.session;
    if (!session.viewNum) {
        session.viewNum = 0;
    }
    session.viewNum++;
    res.json({
        session: session
    });
});
module.exports = router;
