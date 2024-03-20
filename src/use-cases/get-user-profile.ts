import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetUserProfileUseCaseParams = {
	userId: string
}

type GetUserProfileUseCaseResponse = {
	user: User
}

export class GetUserProfileUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ userId }: GetUserProfileUseCaseParams): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.usersRepository.findById(userId)

		if (!user) {
			throw new ResourceNotFoundError()
		}

		return {
			user,
		}
	}
}
