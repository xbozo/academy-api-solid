import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'
import { createGymController } from './create-gym-controller'
import { searchGymsController } from './search-gyms-controller'
import { searchNearbyGymsController } from './search-nearby-gyms-controller'

export const gymsRoutes = async (app: FastifyInstance) => {
	app.addHook('onRequest', verifyJWT)

	app.get('/gyms/search', searchGymsController)
	app.get('/gyms/nearby', searchNearbyGymsController)

	app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createGymController)
}
