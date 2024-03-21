import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { getDistanceBetweenCoordenates } from '@/utils/get-distance-between-coordenates'
import { CheckIn } from '@prisma/client'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumbersOfCheckInsError } from './errors/max-number-of-check-ins-error'

type CheckInUseCaseRequest = {
	userId: string
	gymId: string
	userLatitude: number
	userLongitude: number
}

type CheckInUseCaseResponse = {
	checkIn: CheckIn
}

export class CheckInUseCase {
	constructor(
		private checkInsRepository: CheckInsRepository,
		private gymsRepository: GymsRepository
	) {}

	async execute({
		userId,
		gymId,
		userLatitude,
		userLongitude,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymsRepository.findById(gymId)

		if (!gym) {
			throw new ResourceNotFoundError()
		}

		const distance = getDistanceBetweenCoordenates(
			{ latitude: userLatitude, longitude: userLongitude },
			{ latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
		)

		const MAX_DISTANCE_IN_KILOMETERS = 0.1

		if (distance > MAX_DISTANCE_IN_KILOMETERS) {
			throw new MaxDistanceError()
		}

		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

		if (checkInOnSameDay) {
			throw new MaxNumbersOfCheckInsError()
		}

		const checkIn = await this.checkInsRepository.create({
			gym_id: gymId,
			user_id: userId,
		})

		return {
			checkIn,
		}
	}
}
