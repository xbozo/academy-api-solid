import { Gym, Prisma } from '@prisma/client'

export type GymsRepository = {
	findById(id: string): Promise<Gym | null>
	create(data: Prisma.GymCreateInput): Promise<Gym>
}
