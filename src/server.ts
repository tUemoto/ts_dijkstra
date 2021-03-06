import Fastify from 'fastify'
import 'dotenv/config'
import { validatePort } from './validatePort'
import { dijkstra } from './dijkstra/main'
import { StartEndInterface } from './types/endpoint'

const port =
  validatePort(process.env.PORT) ??
  (() => {
    throw new Error(`invalid $PORT: ${process.env.PORT as string}`)
  })()

const fastify = Fastify({ logger: true })

fastify.get('/', async (request, reply) => {
  const userAgent = request.headers['user-agent']
  if (userAgent === undefined)
    throw new Error(`statusCode: 400, message: "user-agent is empty"`)
  return userAgent
})

fastify.get<{
  QueryString: StartEndInterface
  Reply: EkiT | string
}>('/get_saitan_keiro', async (request, reply) => {
  const { shiten, shuten } = request.query as { shiten: string; shuten: string }
  // return { shiten, shuten }
  try {
    await reply.status(200).send(dijkstra(shiten, shuten))
  } catch (error) {
    await reply.status(500).send('error occured')
  }
})

fastify.listen({ port }).catch((err) => {
  console.log(`Error starting server:`, err)
  process.exit(1)
})

process.once('SIGTERM', () => {
  fastify.log.info(`Closing by SIGTERM`)
  fastify.close().then(
    () => {},
    () => {},
  )
})

process.once('SIGINT', () => {
  fastify.log.info(`Closing by SIGINT`)
  fastify.close().then(
    () => {},
    () => {},
  )
})
