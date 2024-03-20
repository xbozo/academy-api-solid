import { CheckIn, Prisma } from '@prisma/client'

export type CheckInsRepository = {
	create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
}
