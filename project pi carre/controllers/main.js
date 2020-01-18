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
function somme(req,res,id,next){ //sommme totale des achats
  return db('share_in_machine').sum('traded_currency').innerJoin('records','machine_id','machineid').where('user_id',id);
}
function sommeavg(req,res,id,next){ //prix moyen entrée sur eth
  return db('records').avg('price').innerJoin('share_in_machine','machineid','machine_id').innerJoin('buymachines','buymachines.user_id','share_in_machine.user_id').where({
    'trading_pair':'etheur',
    'buymachines.user_id' : id});
}
function sommeavg2(req,res,id,next){ //moyenne des achats pour chaque opé
  return db('share_in_machine').avg('traded_currency').innerJoin('records','machine_id','machineid').where('user_id',id);
}
function somme2(req,res,id,next){ //nb achat par user
  return db('share_in_machine').count('traded_currency').innerJoin('records','machine_id','machineid').where('user_id',id);
}
module.exports = {
    getTableData,
    getUser,
    getUserBymail,
    Create,
    getAdmin,
    somme,
    sommeavg,
    somme2,
    sommeavg2
}
