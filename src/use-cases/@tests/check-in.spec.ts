import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from '@/use-cases/create-check-in'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumbersOfCheckInsError } from '../errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

let defaultLatitude = -27.2092052
let defaultLongitude = -49.6401091

describe('Check-in Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		gymsRepository = new InMemoryGymsRepository()
		sut = new CheckInUseCase(checkInsRepository, gymsRepository)

		await gymsRepository.create({
			id: 'gym-01',
			name: 'JavaScript Gym',
			description: '',
			phone: '',
			latitude: defaultLatitude,
			longitude: defaultLongitude,
		})

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to check in', async () => {
		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: defaultLatitude,
			userLongitude: defaultLongitude,
		})

		expect(checkIn.id).toBeTypeOf('string')
	})

	it('should not be able to check in on distant gym', async () => {
		await gymsRepository.create({
			id: 'gym-02',
			name: 'TypeScript Gym',
			description: '',
			phone: '',
			latitude: -27.0747279,
			longitude: -49.4889672,
		})

		expect(
			async () =>
				await sut.execute({
					gymId: 'gym-02',
					userId: 'user-01',
					userLatitude: defaultLatitude,
					userLongitude: defaultLongitude,
				})
		).rejects.toBeInstanceOf(MaxDistanceError)
	})

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: defaultLatitude,
			userLongitude: defaultLongitude,
		})

		await expect(() =>
			sut.execute({
				gymId: 'gym-01',
				userId: 'user-01',
				userLatitude: defaultLatitude,
				userLongitude: defaultLongitude,
			})
		).rejects.toBeInstanceOf(MaxNumbersOfCheckInsError)
	})

	it('should be able to check in twice but in different days', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: defaultLatitude,
			userLongitude: defaultLongitude,
		})

		vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: defaultLatitude,
			userLongitude: defaultLongitude,
		})

		expect(checkIn.id).toBeTypeOf('string')
	})
})
