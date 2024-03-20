import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists-error'
import { RegisterUserUseCase } from './register-user'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register user use-case', () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository()
		sut = new RegisterUserUseCase(usersRepository)
	})

	it('should be able to register user', async () => {
		const { user } = await sut.execute({
			name: 'John doe',
			email: 'johndoe@example.com',
			password: '123456',
		})

		expect(user.id).toBeTypeOf('string')
	})

	it('should hash user password upon registration', async () => {
		const { user } = await sut.execute({
			name: 'John doe',
			email: 'johndoe@example.com',
			password: '123456',
		})

		const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to register with existing email', async () => {
		await sut.execute({
			name: 'John doe',
			email: 'johndoe@example.com',
			password: '123456',
		})

		expect(async () => {
			await sut.execute({
				name: 'John doe',
				email: 'johndoe@example.com',
				password: '123456',
			})
		}).rejects.toBeInstanceOf(UserEmailAlreadyExistsError)
	})
})
