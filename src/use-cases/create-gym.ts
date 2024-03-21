import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

type CreateGymUseCaseParams = {
	name: string
	description: string | null
	phone: string | null
	latitude: number
	longitude: number
}

type CreateGymUseCaseResponse = {
	gym: Gym
}

export class CreateGymUseCase {
	constructor(private gymsRepository: GymsRepository) {}

	async execute({
		description,
		latitude,
		longitude,
		name,
		phone,
	}: CreateGymUseCaseParams): Promise<CreateGymUseCaseResponse> {
		const gym = await this.gymsRepository.create({
			description,
			latitude,
			longitude,
			name,
			phone,
		})

		return {
			gym,
		}
	}
}
