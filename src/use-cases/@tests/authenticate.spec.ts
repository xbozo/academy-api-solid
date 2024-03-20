import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '../authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use-case', () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateUseCase(usersRepository)
	})

	it('should be able to authenticate', async () => {
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
		expect(async () => {
			await sut.execute({
				email: 'johndoe@example.com', // user not yet created
				password: '123456',
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
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
