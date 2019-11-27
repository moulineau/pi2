// db Connection w/ localhost
var db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'esilv2019',
        database: 'test'
    }
});



const getTableData = (req, res) => {
  db.select('*').from('users').orderBy('id')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}
const getUserBymail =(email,res,next) => {    
    db('users').where('email', email)
        .then(user => {
            console.log('user', user);
            if (user.length<=1) {
                //this is a unique email
                res.json({
                    message: 'welcome'
                });
            }            
            else {
                next(new error('Email in use'));
            }
        });
}
const getUser = (req, res, id,next) => {
    if (!isNaN(id)) {
        db('users').where('id', id)
            .then(items => {
                if (items) {
                    res.json(items);
                } else {
                    //resError(res, 404, "User Not Found");
                    next(new Error('Invalid User'));
                }
            });
    }
    else {
        next(new Error('Invalid ID'));
    }
}

module.exports = {
    getTableData,
    getUser,
    getUserBymail
}
