const express =require('express');
const router = express();
const bcrypt = require('bcrypt');
const User = require('./main');

var Id = 13;

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
                console.log('user', user);
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

router.post('/login', (req, res,next) => {
    if (validateUser(req.body)) {
        User.getUserBymail(req)
            .then(user => {
                console.log('user', user);
                if (user.length >= 1) {
                    bcrypt.compare(req.body.mdp, user[0].mdp)
                        .then(function (result) {
                            if (result) {//goood password
                                const isSecure = req.app.get('env') != 'development'
                                res.cookie('user_id', user.id, {
                                    httpOnly: true,
                                    signed: true,
                                    secure: isSecure //true in prod
                                });
                                res.json({
                                    id: user[0].id,
                                    message: 'logged in'
                                });
                            }
                            else {
                                next(new Error('Invalid Login'));
                            }
                        });
                    //console.log(user[0].mdp);
                    //if (req.body.mdp == user[0].mdp) {
                    //    res.json({
                    //        message: 'logging in...'
                    //    });
                    //}                    
                } else {
                    next( new Error('Invalid Login'));
                }
                
            })
    } else {
        next(new Error('Invalid Login'));
    }
})

module.exports = router;

//mot de passe pour utilisateur 1 : '123456'
//mot de passe pour utilisateur 2 : 'abcdef'
//mot de p pour uti 3 : 'azerty