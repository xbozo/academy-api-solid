import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export const profileController = async (req: FastifyRequest, reply: FastifyReply) => {
	const getUserProfile = makeGetUserProfileUseCase()

	const { user } = await getUserProfile.execute({
		userId: req.user.sub,
	})

	if (!user) {
		throw new ResourceNotFoundError()
	}

	reply.status(200).send({
		user: {
			...user,
			password_hash: undefined,
		},
	})
}
