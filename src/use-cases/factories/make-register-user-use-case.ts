import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register-user'

export const makeRegisterUserUseCase = () => {
	const prismaUsersRepository = new PrismaUsersRepository()
	const registerUseCase = new RegisterUserUseCase(prismaUsersRepository)

	return registerUseCase
}
