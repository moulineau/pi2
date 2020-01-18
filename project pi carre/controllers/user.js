const express = require('express');
const router = express.Router();
const main = require('./main.js');
const authMiddleware = require('./middleware');


router.get('/allUsers', authMiddleware.adminAccess,(req, res) => { //page admin
    main.getTableData(req, res);
})

router.get('/users/:id', authMiddleware.allowAccess,(req, res, next) => { //accueil user
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

router.get('/users/:id/somme',authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.somme(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items); //return "sum"
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})

router.get('/users/:id/sommeavg',authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.sommeavg(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items); //return "avg"
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/sommeavg2',authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.sommeavg2(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items); //return "avg"
                } else {
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    } 
})
router.get('/users/:id/somme2',authMiddleware.allowAccess,(req,res,next)=>{
    if (!isNaN(req.params.id)) {
        main.somme2(req, res, req.params.id, next)
            .then(items => {
                if (items) {
                    res.json(items); //return "count"
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
    