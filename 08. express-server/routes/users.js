const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/login', function (req, res, next) {
    const {username, password} = req.body;
    res.json({
        username,
        password
    });
});

module.exports = router;
