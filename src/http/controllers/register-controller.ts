import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../libs/prisma'

export const registerController = async (req: FastifyRequest, reply: FastifyReply) => {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { name, email, password } = registerBodySchema.parse(req.body)

	await prisma.user.create({
		data: {
			name,
			email,
			password_hash: password,
		},
	})

	reply.status(201).send()
}
