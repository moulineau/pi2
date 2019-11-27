const express =require('express');
const router = express();
const User = require('./main');

router.get('/',(req,res)=>{
	res.json({
		message: 'its lock'
	});
});

function validateUser(users) {
    const validEmail = typeof users.email == 'string' && users.email.trim() != '';
    const validPassword = typeof users.mdp == 'string' && users.mdp.trim() != '' && users.mdp.trim().length >= 6;
    return validEmail && validPassword;
}


router.post('/signup', (req, res,next) => {
    if (validateUser(req.body)) {
        User.getUserBymail(req.body.email, res,next);
    } else {
        next(new Error('Invalid User'));
    }  
});

module.exports = router;