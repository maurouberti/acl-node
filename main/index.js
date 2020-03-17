const { Router } = require('express');
// const jwt = require('jsonwebtoken');
const { sign, verify } = require('jsonwebtoken');
const acl = require('express-acl');
const router = Router();

const SECRET_KEY = '123#@123';

acl.config({
    filename: './acl.json',
    baseUrl: '/'
});



/**
 * BEGIN MIDDLEWARES
 */

// Login / Autorização (ADAPTAÇÃO)
router.use(async function (req, res, next) {
    // Mock exemplo
    const user = {
        id: Math.random().toString(36).substr(2, 12),
        email: 'admin@admin.com',
        password: '1234',
        role: 'role-user'
    };
    const token = sign(user, SECRET_KEY);
    // const token = jwt.sign(user, SECRET_KEY);

    req.headers['X-Access-Token'] = token;
    next();
});

// Verificação do token
router.use(async function (req, res, next) {
    const token = req.headers['X-Access-Token'];
    if (!token) {
        return res.status(404).end();
    }
    verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(404).json({ err });
        }
        req.decoded = decoded;
        next();
    });
    // jwt.verify(token, SECRET_KEY);
});

router.use(acl.authorize);


/**
 * BEGIN ROUTES
 */

router.get('/', async (req, res) => {
    return res.json({ msg: 'Principal' });
});

router.get('/oi', async (req, res) => {
    return res.json({ msg: 'Oi' });
});

module.exports = router;