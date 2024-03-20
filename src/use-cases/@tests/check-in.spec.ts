import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInUseCase } from '../check-in'

let checkInsRepository: CheckInsRepository
let sut: CheckInUseCase

describe('Check-in use-case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new CheckInUseCase(checkInsRepository)
	})

	it('should be able to check in', async () => {
		const { checkIn } = await sut.execute({
			gymId: '',
			userId: '',
		})

		expect(checkIn.id).toBeTypeOf('string')
	})
})
