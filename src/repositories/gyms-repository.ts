import { Gym, Prisma } from '@prisma/client'

export type FindManyNearbyParams = {
	latitude: number
	longitude: number
}

export type GymsRepository = {
	findById(id: string): Promise<Gym | null>
	create(data: Prisma.GymCreateInput): Promise<Gym>
	searchMany(query: string, page: number): Promise<Gym[]>
	findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
}
