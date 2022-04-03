import Fastify from 'fastify';
import 'dotenv/config';
import { validatePort } from './validatePort';

const port =
  validatePort(process.env['PORT']) ??
  (() => {
    throw new Error(`invalid $PORT: ${process.env['PORT']}`);
  })();

const fastify = Fastify({ logger: true });

fastify.get('/', async (request, reply) => {
  const userAgent = request.headers['user-agent'];
  if (userAgent === undefined)
    throw { statusCode: 400, message: `user-agent is empty` };
  return userAgent;
});

fastify.listen({ port }).catch((err) => {
  console.log(`Error starting server:`, err);
  process.exit(1);
});

process.once('SIGTERM', () => {
  fastify.log.info(`Closing by SIGTERM`);
  fastify.close();
});

process.once('SIGINT', () => {
  fastify.log.info(`Closing by SIGINT`);
  fastify.close();
});
