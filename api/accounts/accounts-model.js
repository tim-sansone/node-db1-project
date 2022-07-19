const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where('id', id).first()
}

const getByName = name => {
  return db('accounts').where('name', name).first()
}

const create = account => {
  return db('accounts').insert(account)
    .then(idArray => getById(idArray[0]))
}

const updateById = (id, account) => {
  return db('accounts').where('id', id).update(account)
    .then(count => count > 0 ? getById(id) : null)
}

const deleteById = id => {
  console.log(id)
  return db('accounts').where('id', id).delete()
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
