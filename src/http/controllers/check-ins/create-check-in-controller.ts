import { makeCreateCheckInUseCase } from '@/use-cases/factories/make-create-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const createCheckInController = async (req: FastifyRequest, reply: FastifyReply) => {
	const createCheckInBodySchema = z.object({
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90
		}),
		longitude: z.number().refine((value) => {
			return Math.abs(value) <= 180
		}),
	})
	const createCheckInParamsSchema = z.object({
		gymId: z.string().uuid(),
	})

	const { latitude, longitude } = createCheckInBodySchema.parse(req.body)
	const { gymId } = createCheckInParamsSchema.parse(req.params)

	const createCheckInUseCase = makeCreateCheckInUseCase()

	await createCheckInUseCase.execute({
		gymId,
		userId: req.user.sub,
		userLatitude: latitude,
		userLongitude: longitude,
	})

	reply.status(201).send()
}
