import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists-error'
import { RegisterUseCase } from './register-user'

describe('Register user use-case', () => {
	it('should be able to register user', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const registerUseCase = new RegisterUseCase(usersRepository)

		const { user } = await registerUseCase.execute({
			name: 'John doe',
			email: 'johndoe@example.com',
			password: '123456',
		})

		expect(user.id).toBeTypeOf('string')
	})

	it('should hash user password upon registration', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const registerUseCase = new RegisterUseCase(usersRepository)

		const { user } = await registerUseCase.execute({
			name: 'John doe',
			email: 'johndoe@example.com',
			password: '123456',
		})

		const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to register with existing email', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const registerUseCase = new RegisterUseCase(usersRepository)

		await registerUseCase.execute({
			name: 'John doe',
			email: 'johndoe@example.com',
			password: '123456',
		})

		expect(async () => {
			await registerUseCase.execute({
				name: 'John doe',
				email: 'johndoe@example.com',
				password: '123456',
			})
		}).rejects.toBeInstanceOf(UserEmailAlreadyExistsError)
	})
})
