import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createCheckInController } from './create-check-in-controller'
import { checkInsHistoryController } from './fetch-user-check-ins-history-controller'
import { getUserMetricsController } from './get-user-metrics-controller'
import { validateCheckInController } from './validate-check-in-controller'

export const checkInsRoutes = async (app: FastifyInstance) => {
	app.addHook('onRequest', verifyJWT)

	app.get('/check-ins/history', checkInsHistoryController)
	app.get('/check-ins/metrics', getUserMetricsController)

	app.post('/gyms/:gymId/check-ins', createCheckInController)
	app.patch('/check-ins/:checkInId', validateCheckInController)
}
