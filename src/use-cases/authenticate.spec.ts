import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate use-case', () => {
	it('should be able to authenticate', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const sut = new AuthenticateUseCase(usersRepository)

		await usersRepository.create({
			name: 'John doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 6),
		})

		const { user } = await sut.execute({
			email: 'johndoe@example.com',
			password: '123456',
		})

		expect(user.id).toBeTypeOf('string')
	})

	it('should not be able to authenticate with wrong email', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const sut = new AuthenticateUseCase(usersRepository)

		expect(async () => {
			await sut.execute({
				email: 'johndoe@example.com', // user not yet created
				password: '123456',
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const sut = new AuthenticateUseCase(usersRepository)

		await usersRepository.create({
			name: 'John doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 6),
		})

		expect(async () => {
			await sut.execute({
				email: 'johndoe@example.com',
				password: '123123',
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
