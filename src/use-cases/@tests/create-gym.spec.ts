import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from '../create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

let defaultLatitude = -27.2092052
let defaultLongitude = -49.6401091

describe('Create gym use-case', () => {
	beforeEach(async () => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new CreateGymUseCase(gymsRepository)
	})

	it('should be able to create gym', async () => {
		const { gym } = await sut.execute({
			name: 'JavasScript Gym',
			description: null,
			phone: null,
			latitude: defaultLatitude,
			longitude: defaultLongitude,
		})

		expect(gym.id).toBeTypeOf('string')
	})
})
