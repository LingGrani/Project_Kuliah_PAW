require('dotenv')
const express = require('express')
const router = express.Router();

router.use((req, res, next) => {
    req.app.set('layout', 'layouts/admin-layout');
    next();
});

router.get('/', (req, res) => {
    return res.render('admin/index');
});

module.exports = router;