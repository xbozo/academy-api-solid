import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const authenticateController = async (req: FastifyRequest, reply: FastifyReply) => {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { email, password } = authenticateBodySchema.parse(req.body)

	try {
		const authenticateUseCase = makeAuthenticateUseCase()

		const { user } = await authenticateUseCase.execute({
			email,
			password,
		})

		const token = await reply.jwtSign(
			{
				role: user.role,
			},
			{
				sign: {
					sub: user.id, // subject
				},
			}
		)

		const refreshToken = await reply.jwtSign(
			{
				role: user.role,
			},
			{
				sign: {
					sub: user.id,
					expiresIn: '7d',
				},
			}
		)

		reply
			.status(200)
			.setCookie('refreshToken', refreshToken, {
				path: '/', // all
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.send({
				token,
			})
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: err.message })
		}

		throw err
	}
}
