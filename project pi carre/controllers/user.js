const express = require('express');
const router = express.Router();
const main = require('./main.js');
const authMiddleware = require('./middleware');


router.get('/allUsers', authMiddleware.adminAccess,(req, res) => {
    main.getTableData(req, res);
})

router.get('/users/:id', authMiddleware.allowAccess,(req, res, next) => {
    if (!isNaN(req.params.id)) {
        main.getUser(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items);
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
module.exports = router;
    