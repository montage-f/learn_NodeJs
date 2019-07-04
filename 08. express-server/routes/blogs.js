/**
 * Created by montage_fz on 2019-07-04
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        data: '我是blogs路由'
    });
    
});

module.exports = router;
