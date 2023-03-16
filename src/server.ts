import fastify from 'fastify'

const server = fastify()

server.get('/isUp', async (request, reply) => {
  return {
    message: 'Server is up! Start coding and thanks for use this API! 🍾',
  }
})

server
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server is running at http://localhost:3333 🚀'))
