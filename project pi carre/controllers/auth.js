const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./main');
var Id = 13;
const authMiddleware = require('./middleware');


router.get('/',(req,res)=>{
	res.json({
		message: 'its lock'
	});
});

function validateUser(users) {
    const validEmail = typeof (users.email) == 'string' && users.email.trim() != '';
    const validPassword = typeof users.mdp == 'string' && users.mdp.trim() != '' && users.mdp.trim().length >= 6;
    return validEmail && validPassword;
}

router.post('/signup', (req, res,next) => {
    if (validateUser(req.body)) {
        User.getUserBymail(req)
            .then(user => {
                if (user.length < 1) {
                    //this is a unique email
                    //insert new user into db + crypt password
                    bcrypt.hash(req.body.mdp, 10)
                        .then((hash) => {
                            const user2 = {
                                email: req.body.email,
                                mdp: hash,
                                prenom: req.body.prenom,
                                nom: req.body.nom,
                                id: Id
                            };
                            User.Create(user2, res)
                                .then(id => {
                                    res.json({
                                        Id,
                                        message: 'ok'
                                    });
                                });
                            Id = Id + 1;
                        });
                }
                else {
                    next(new Error('Email in use'));
                }
            });
    } else {
        next(new Error('Invalid User'));
    }  
});
router.get('/logout', (req, res) => {
    res.clearCookie('user_id');
    res.json({
        message: 'logout succesfully'
    });
});
router.get('/isadmin', authMiddleware.ensureLoggedIn,(req, res, next) => {
    User.getAdmin(req, res, req.signedCookies.user_id, next)
        .then(response => {
            console.log(response[0].isadmin);
            res.json({ admin: response[0].isadmin });            
        }); 
})
router.post('/login', (req, res,next) => {
    if (validateUser(req.body)) {
        User.getUserBymail(req)
            .then(user => {
                if (user.length >= 1) {
                    bcrypt.compare(req.body.mdp, user[0].mdp)
                        .then(function (result) {
                            if (result) {//goood password
                                const isSecure = req.app.get('env') != 'development'
                                res.cookie('user_id', user[0].id, {
                                    httpOnly: true,
                                    signed: true,
                                    secure: false //true in prod
                                });
                                res.json({
                                    id: user[0].id,
                                    message: 'logged in'
                                });
                            }
                            else {
                                next(new Error('Wrong Password'));
                            }
                        });
                    //console.log(user[0].mdp);
                    //if (req.body.mdp == user[0].mdp) {
                    //    res.json({
                    //        message: 'logging in...'
                    //    });
                    //}                    
                } else {
                    next( new Error('Undefined User'));
                }
                
            })
    } else {
        next(new Error('Invalid Login or password'));
    }
})

module.exports = router;

//mot de passe pour utilisateur 1 : '123456'
//mot de passe pour utilisateur 2 : 'abcdef'
//mot de p pour uti 3 : 'azerty