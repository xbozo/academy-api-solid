import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/register-user-controller'

export const appRoutes = async (app: FastifyInstance) => {
	app.post('/users', registerUserController)
}
