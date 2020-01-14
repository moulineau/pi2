const main = require('./main.js');


function ensureLoggedIn(req, res, next) {
    if (req.signedCookies.user_id) {
        next();
    } else {
        var err = new Error('Un-Authorized');
        err.status=401;
        next(err);
    }
}
function allowAccess(req, res, next) {
    if (req.signedCookies.user_id==req.params.id) {
        next();
    } else {
        var err = new Error('Un-Authorized User');
        err.status = 401;
        next(err);
    }
}
function adminAccess(req, res, next) {
    var result = null;
    main.getAdmin(req, res, req.signedCookies.user_id, next)
        .then(res => {
            console.log('reponse : ', res[0].isadmin);
            result = res[0].isadmin;
            if (result == true) {
                next();
            } else {
                var err = new Error('Not Admin');
                err.status = 401;
                next(err);
            }
        });    
}

module.exports = {
    ensureLoggedIn,
    allowAccess,
    adminAccess
};