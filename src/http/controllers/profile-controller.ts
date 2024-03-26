import { FastifyReply, FastifyRequest } from 'fastify'

export const profileController = async (req: FastifyRequest, reply: FastifyReply) => {
	await req.jwtVerify() // throws an error if fails

	console.log(req.user.sub)

	reply.status(200).send()
}
