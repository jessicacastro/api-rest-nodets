import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

app.register(cookie)

// app.addHook('preHandler', async (request, reply) => {
//   console.log(
//     `REQUEST: [${request.method}] 🔗 [${request.url}] - ${request.ip} 🌎`,
//   )
// })

app.register(transactionsRoutes, { prefix: '/transactions' })

app.get('/isUp', async () => {
  return {
    message: 'Server is up! Start coding and thanks for use this API! 🍾',
  }
})
