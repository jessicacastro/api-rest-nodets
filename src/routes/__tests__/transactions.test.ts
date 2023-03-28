import stRequest from 'supertest'
import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import { app } from '../../app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GET /transactions', () => {
    describe('When a client try to get transactions without a session id', async () => {
      it('should return the error with status code 401', async () => {
        const response = await stRequest(app.server).get('/transactions')

        expect(response.status).toBe(401)
      })
    })

    describe('When a client try to get all transactions with a valid session id', async () => {
      it('should return the success with status code 200', async () => {
        const createTransactionResponse = await stRequest(app.server)
          .post('/transactions')
          .send({
            title: 'Transaction title',
            amount: 100,
            type: 'credit',
          })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const response = await stRequest(app.server)
          .get('/transactions')
          .set('Cookie', cookies)

        expect(response.status).toBe(200)
      })

      it('should return transactions list', async () => {
        const createTransactionResponse = await stRequest(app.server)
          .post('/transactions')
          .send({
            title: 'Transaction title',
            amount: 100,
            type: 'credit',
          })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const response = await stRequest(app.server)
          .get('/transactions')
          .set('Cookie', cookies)

        expect(response.body.transactions).toEqual([
          expect.objectContaining({
            title: 'Transaction title',
            amount: 100,
          }),
        ])
      })
    })

    describe('When a client try to get a transaction with a valid session id', async () => {
      it('should return the success with status code 200', async () => {
        const createTransactionResponse = await stRequest(app.server)
          .post('/transactions')
          .send({
            title: 'Transaction title',
            amount: 100,
            type: 'credit',
          })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const response = await stRequest(app.server)
          .get('/transactions')
          .set('Cookie', cookies)

        expect(response.status).toBe(200)
      })

      it('should return the transaction', async () => {
        const createTransactionResponse = await stRequest(app.server)
          .post('/transactions')
          .send({
            title: 'Transaction title',
            amount: 250,
            type: 'credit',
          })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const response = await stRequest(app.server)
          .get('/transactions')
          .set('Cookie', cookies)

        expect(response.body.transactions).toEqual([
          expect.objectContaining({
            title: 'Transaction title',
            amount: 250,
          }),
        ])
      })
    })

    describe('When a client try to get a summary about transactions with a valid session id', async () => {
      it('should return the success with status code 200', async () => {
        const createTransactionResponse = await stRequest(app.server)
          .post('/transactions')
          .send({
            title: 'Transaction title',
            amount: 100,
            type: 'credit',
          })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const response = await stRequest(app.server)
          .get('/transactions/summary')
          .set('Cookie', cookies)

        expect(response.status).toBe(200)
      })

      it('should return the summary', async () => {
        const createTransactionResponse = await stRequest(app.server)
          .post('/transactions')
          .send({
            title: 'Transaction title',
            amount: 100,
            type: 'credit',
          })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const response = await stRequest(app.server)
          .get('/transactions/summary')
          .set('Cookie', cookies)

        expect(response.body.summary).toEqual({
          amount: 100,
        })
      })
    })
  })

  describe('POST /transactions', () => {
    describe('When a client try to create a new transaction with all valid fields', async () => {
      const transactionMock = {
        title: 'Transaction title',
        amount: 100,
        type: 'credit',
      }

      it('should return the success with status code 201', async () => {
        const response = await stRequest(app.server)
          .post('/transactions')
          .send(transactionMock)

        expect(response.status).toBe(201)
      })
    })

    describe('When a client try to create a new transaction with a invalid title', async () => {
      const transactionMock = {
        title: 123,
        amount: 100,
        type: 'credit',
      }

      it('should return the error with status code 400', async () => {
        const response = await stRequest(app.server)
          .post('/transactions')
          .send(transactionMock)

        expect(response.status).toBe(400)
      })
    })

    describe('When a client try to create a new transaction with a invalid type', async () => {
      const transactionMock = {
        title: 'Transaction title',
        amount: 100,
        type: 'invalid',
      }

      it('should return the error with status code 400', async () => {
        const response = await stRequest(app.server)
          .post('/transactions')
          .send(transactionMock)

        expect(response.status).toBe(400)
      })
    })

    describe('When a client try to create a new transaction with a invalid amount', async () => {
      const transactionMock = {
        title: 'Transaction title',
        amount: 'invalid',
        type: 'credit',
      }

      it('should return the error with status code 400', async () => {
        const response = await stRequest(app.server)
          .post('/transactions')
          .send(transactionMock)

        expect(response.status).toBe(400)
      })
    })
  })
})
