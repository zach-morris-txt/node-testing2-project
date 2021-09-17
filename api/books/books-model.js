//Imports
const db = require('../../data/dbConfig.js')


//Model-Functions
function getById(id) {
  return db('books')
    .where({ id })
    .first()
}

async function create({ title, author }) {
  const [id] = await db('books')
    .insert({ title, author })
  return getById(id)
}

async function remove(id) {
  const removing = await getById(id)
  await db('books')
    .where({ id })
    .del()
  return removing
}


//Exports; Exposing
module.exports = {
    getById,
    create,
    remove,
}