require('dotenv')
const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    return res.render('admin/index');
});

module.exports = router;