import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists-error'

type RegisterServiceParams = {
	name: string
	email: string
	password: string
}

type RegisterUseCaseResponse = {
	user: User
}

export class RegisterUseCase {
	// esse private transforma o parâmetro como uma prop da classe
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		name,
		password,
	}: RegisterServiceParams): Promise<RegisterUseCaseResponse> {
		const password_hash = await hash(password, 6)

		const userEmailAlreadyExists = await this.usersRepository.findByEmail(email)

		if (userEmailAlreadyExists) {
			throw new UserEmailAlreadyExistsError()
		}

		const user = await this.usersRepository.create({
			email,
			name,
			password_hash,
		})

		return {
			user,
		}
	}
}
