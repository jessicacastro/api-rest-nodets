import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database/database'
import { checkIfSessionIdExists } from '../middlewares/check-if-session-id-exists'

export const transactionsRoutes = async (app: FastifyInstance) => {
  app.get('/', { preHandler: [checkIfSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies

    const transactions = await knex('transactions').where(
      'session_id',
      sessionId,
    )

    return {
      transactions,
    }
  })

  app.get('/:id', { preHandler: [checkIfSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies

    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex('transactions')
      .where({
        id,
        session_id: sessionId,
      })
      .first()

    if (!transaction) {
      return {
        error: 'Transaction not found',
      }
    }

    return {
      transaction,
    }
  })

  app.get(
    '/summary',
    { preHandler: [checkIfSessionIdExists] },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .sum('amount', { as: 'amount' })
        .where('session_id', sessionId)
        .first()

      return { summary }
    },
  )

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      type: z.enum(['credit', 'debit']),
      amount: z.number(),
    })

    const resultTransactionSchema = createTransactionBodySchema.safeParse(
      request.body,
    )

    if (!resultTransactionSchema.success) {
      return reply.code(400).send({
        error: 'Invalid fields on request, please verify your data. 📌',
      })
    }

    const { title, type, amount } = resultTransactionSchema.data

    const sessionId = request.cookies.sessionId ?? randomUUID()

    reply.setCookie('sessionId', sessionId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year (365 days)
    })

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.code(201).send()
  })
}
