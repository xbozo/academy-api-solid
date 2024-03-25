import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

type FetchNearbyGymsUseCaseParams = {
	userLatitude: number
	userLongitude: number
}

type FetchNearbyGymsUseCaseResponse = {
	gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
	constructor(private gymsRepository: GymsRepository) {}

	async execute({
		userLongitude,
		userLatitude,
	}: FetchNearbyGymsUseCaseParams): Promise<FetchNearbyGymsUseCaseResponse> {
		const gyms = await this.gymsRepository.findManyNearby({
			latitude: userLatitude,
			longitude: userLongitude,
		})

		return {
			gyms,
		}
	}
}
