
const getTableData = (req, res, db) => {
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
const getUser = (req, res, db,id) => {
    db('users').where('id', id)
        .then(items => {
            if (items) {
                res.json(items);
            } else {
                resError(res, 404, "User Not Found");
            }
        });
}



module.exports = {
    getTableData,
    getUser
}
