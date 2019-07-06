/**
 * Created by montage_fz on 2019-07-04
 */
const express = require('express');
const router = express.Router();

const {
    successInfo: {
        SuccessInfo,
        ErrorInfo
    }
} = require('../middleware');

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');

router.get('/list', async (req, res, next) => {
    console.log(req.headers.cookie.split(';')[1]);
    const {author, keyword} = req.query;
    const data = await getList(author, keyword);
    res.json(
        new SuccessInfo(data)
    );
    
});

module.exports = router;
