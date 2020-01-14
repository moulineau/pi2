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
function getUserBymail (req)  {
    return db('users').where('email', req.body.email);
}
function Create (user,res) {
    return db('users').insert(user).then(ids => { return ids[0];});    
}
function getUser(req, res, id, next) {
    return db('users').where('id', id);  
}
function getAdmin(req, res, id, next){
    return db('users').where('id', id).select('isadmin');
}

module.exports = {
    getTableData,
    getUser,
    getUserBymail,
    Create,
    getAdmin
}
