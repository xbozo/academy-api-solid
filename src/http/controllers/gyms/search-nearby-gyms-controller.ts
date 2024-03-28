import { makeNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const searchNearbyGymsController = async (req: FastifyRequest, reply: FastifyReply) => {
	const searchNearbyGymsQuerySchema = z.object({
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90
		}),
		longitude: z.number().refine((value) => {
			return Math.abs(value) <= 180
		}),
	})

	const { latitude, longitude } = searchNearbyGymsQuerySchema.parse(req.query)

	const fetchNearbyGymsUseCase = makeNearbyGymsUseCase()

	const { gyms } = await fetchNearbyGymsUseCase.execute({
		userLatitude: latitude,
		userLongitude: longitude,
	})

	reply.status(200).send({
		gyms,
	})
}
