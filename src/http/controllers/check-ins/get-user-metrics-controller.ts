import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getUserMetricsController = async (req: FastifyRequest, reply: FastifyReply) => {
	const getUserMetricsUseCase = makeGetUserMetricsUseCase()

	const { checkInsCount } = await getUserMetricsUseCase.execute({
		userId: req.user.sub,
	})

	reply.status(200).send({
		checkInsCount,
	})
}
