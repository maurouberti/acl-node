const { Router } = require('express');
// const jwt = require('jsonwebtoken');
const { sign, verify } = require('jsonwebtoken');
const acl = require('express-acl');
const router = Router();

acl.config({
    filename: './acl.json',
    baseUrl: '/'
});

router.use(acl.authorize);



router.get('/', async (req, res) => {
    return res.json({ msg: 'Admin' });
});

module.exports = router;