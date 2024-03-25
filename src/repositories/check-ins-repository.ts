import { CheckIn, Prisma } from '@prisma/client'

export type CheckInsRepository = {
	create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
	findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>
	findManyByUserId: (userId: string, page: number) => Promise<CheckIn[]>
	countByUserId: (userId: string) => Promise<number>
}
