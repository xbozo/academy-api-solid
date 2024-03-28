import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create gym controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to create gym', async () => {
		const { token } = await createAndAuthenticateUser(app, true)

		const profileResponse = await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'JavaScript Gym',
				description: 'Some description',
				phone: '11999999999',
				latitude: -27.2092052,
				longitude: -49.6401091,
			})

		expect(profileResponse.statusCode).toEqual(201)
	})
})
