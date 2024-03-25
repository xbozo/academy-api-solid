import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

type SearchGymsUseCaseParams = {
	query: string
	page: number
}

type SearchGymsUseCaseResponse = {
	gyms: Gym[]
}

export class SearchGymsUseCase {
	constructor(private gymsRepository: GymsRepository) {}

	async execute({ page, query }: SearchGymsUseCaseParams): Promise<SearchGymsUseCaseResponse> {
		const gyms = await this.gymsRepository.searchMany(query, page)

		return {
			gyms,
		}
	}
}
