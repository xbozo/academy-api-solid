import { CheckInsRepository } from '@/repositories/check-ins-repository'

type GetUserMetricsRequest = {
	userId: string
}

type GetUserMetricsUseCaseResponse = {
	checkInsCount: number
}

export class GetUserMetricsUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({ userId }: GetUserMetricsRequest): Promise<GetUserMetricsUseCaseResponse> {
		const checkInsCount = await this.checkInsRepository.countByUserId(userId)

		return {
			checkInsCount,
		}
	}
}
