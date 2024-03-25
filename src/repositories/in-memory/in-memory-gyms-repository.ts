import { FindManyNearbyParams, GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordenates } from '@/utils/get-distance-between-coordenates'
import { Gym, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'

export class InMemoryGymsRepository implements GymsRepository {
	public items: Gym[] = []

	async create(data: Prisma.GymCreateInput) {
		const gym = {
			id: data.id ?? randomUUID(),
			name: data.name,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Decimal(data.latitude.toString()),
			longitude: new Decimal(data.longitude.toString()),
			created_at: new Date(),
		}

		this.items.push(gym)

		return gym
	}

	async findById(id: string) {
		const gym = this.items.find((item) => item.id === id)

		if (!gym) {
			return null
		}

		return gym
	}

	async searchMany(query: string, page: number) {
		return this.items
			.filter((gym) => gym.name.toLowerCase().includes(query.toLowerCase()))
			.slice((page - 1) * 20, page * 20)
	}

	async findManyNearby(params: FindManyNearbyParams) {
		return this.items.filter((gym) => {
			const distance = getDistanceBetweenCoordenates(
				{ latitude: params.latitude, longitude: params.longitude },
				{ latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
			)

			// 10km
			return distance < 10
		})
	}
}
