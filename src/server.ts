import 'dotenv/config'
import crypto from 'node:crypto'
import fastify from 'fastify'
import { knex } from './database/database'

const server = fastify()
const PORT = Number(process.env.PORT) || 3333

server.get('/isUp', async (request, reply) => {
  const tables = await knex('sqlite_schema').select('*')

  return {
    message: 'Server is up! Start coding and thanks for use this API! 🍾',
    tables,
  }
})

server.get('/', async (request, reply) => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 100,
    })
    .returning('*')

  return transaction
})

server
  .listen({
    port: PORT,
  })
  .then(() => console.log(`Server is running at http://localhost:${PORT} 🚀`))
