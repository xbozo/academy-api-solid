import { FastifyReply, FastifyRequest } from 'fastify'

export const verifyJWT = async (req: FastifyRequest, reply: FastifyReply) => {
	try {
		await req.jwtVerify()
	} catch (err) {
		return reply.status(401).send({
			message: 'Unauthorized.',
		})
	}
}
