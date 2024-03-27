import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const searchGymsController = async (req: FastifyRequest, reply: FastifyReply) => {
	const searchGymsQuerySchema = z.object({
		query: z.string(),
		page: z.coerce.number().min(1).default(1),
	})

	const { page, query } = searchGymsQuerySchema.parse(req.query)

	const searchGymsUseCase = makeSearchGymsUseCase()

	const { gyms } = await searchGymsUseCase.execute({
		page,
		query,
	})

	reply.status(201).send({
		gyms,
	})
}
