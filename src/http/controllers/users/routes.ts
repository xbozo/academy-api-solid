import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticateController } from './authenticate-controller'
import { profileController } from './profile-controller'
import { refreshController } from './refresh-controller'
import { registerUserController } from './register-user-controller'

export const usersRoutes = async (app: FastifyInstance) => {
	app.post('/users', registerUserController)
	app.post('/sessions', authenticateController)

	app.patch('/token/refresh', refreshController)

	// Authenticated
	app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
