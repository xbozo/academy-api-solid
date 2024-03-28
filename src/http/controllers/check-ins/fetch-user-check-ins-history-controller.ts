import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const checkInsHistoryController = async (req: FastifyRequest, reply: FastifyReply) => {
	const fetchUserCheckInsHistoryControllerQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	})

	const { page } = fetchUserCheckInsHistoryControllerQuerySchema.parse(req.query)

	const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

	const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
		page,
		userId: req.user.sub,
	})

	reply.status(200).send({
		checkIns,
	})
}
