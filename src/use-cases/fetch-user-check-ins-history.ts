import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

type FetchUserCheckInsHistoryRequest = {
	userId: string
	page: number
}

type FetchUserCheckInsHistoryUseCaseResponse = {
	checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		userId,
		page,
	}: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
		const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

		return {
			checkIns,
		}
	}
}
