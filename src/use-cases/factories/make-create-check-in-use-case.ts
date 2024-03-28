import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateCheckInUseCase } from '../create-check-in'

export const makeCreateCheckInUseCase = () => {
	const prismaCheckInsRepository = new PrismaCheckInsRepository()
	const prismaGymsRepository = new PrismaGymsRepository()

	const useCase = new CreateCheckInUseCase(prismaCheckInsRepository, prismaGymsRepository)

	return useCase
}
