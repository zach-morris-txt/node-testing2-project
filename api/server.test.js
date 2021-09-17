//Imports
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')


//DATABASE Management
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('books').truncate()
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})


//Testing Server
test('sanity', () => {
  expect(true).toBeTruthy()
})

describe('[POST] /books', () => {
  it('Returns a status 201 CREATED', async () => {
    const res = await request(server).post('/books').send({ title: "The CIA and the Cult of Intelligence", author: "Marchetti" })
    expect(res.status).toBe(201)
  })
  it('Returns newly created book', async () => {
    const res = await request(server).post('/books').send({ title: "The CIA and the Cult of Intelligence", author: "Marchetti" })
    expect(res.body).toMatchObject({ id: 5, title: "The CIA and the Cult of Intelligence", author: "Marchetti" })
  })
})

describe('[DELETE] /books/:id', () => {
  it('Returns a status 204 DELETED', async () => {
    const res = await request(server).delete('/books/4')
    expect(res.status).toBe(204)
  })
})