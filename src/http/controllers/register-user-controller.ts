import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserEmailAlreadyExistsError } from '@/use-cases/errors/user-email-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const registerUserController = async (req: FastifyRequest, reply: FastifyReply) => {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { name, email, password } = registerBodySchema.parse(req.body)

	try {
		const prismaUsersRepository = new PrismaUsersRepository()
		const registerUseCase = new RegisterUseCase(prismaUsersRepository)

		await registerUseCase.execute({
			name,
			email,
			password,
		})
	} catch (err) {
		if (err instanceof UserEmailAlreadyExistsError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	reply.status(201).send()
}
