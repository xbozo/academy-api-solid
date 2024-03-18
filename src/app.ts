import fastify from 'fastify'
import { registerController } from './http/controllers/register-controller'

export const app = fastify()

app.post('/users', registerController)
