const join = require('path');
const router = require('express').Router();

router
    .get('/*', (req, res, next) => {
        const routePath = join(__dirname + '..', '..', '..', 'dist/' + 'index.html');
        res.sendFile(routePath);
    })

module.exports = router;