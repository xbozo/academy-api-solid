import { FastifyInstance } from 'fastify'
import { authenticateController } from './controllers/authenticate-controller'
import { registerUserController } from './controllers/register-user-controller'

export const appRoutes = async (app: FastifyInstance) => {
	app.post('/users', registerUserController)
	app.post('/sessions', authenticateController)
}
