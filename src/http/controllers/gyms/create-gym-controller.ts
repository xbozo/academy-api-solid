import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const createGymController = async (req: FastifyRequest, reply: FastifyReply) => {
	const createGymBodySchema = z.object({
		name: z.string(),
		description: z.string().nullable(),
		phone: z.string().nullable(),
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90
		}),
		longitude: z.number().refine((value) => {
			return Math.abs(value) <= 180
		}),
	})

	const { name, description, latitude, longitude, phone } = createGymBodySchema.parse(req.body)

	const createGymUseCase = makeCreateGymUseCase()

	await createGymUseCase.execute({
		name,
		description,
		latitude,
		longitude,
		phone,
	})

	reply.status(201).send()
}
