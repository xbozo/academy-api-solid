import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search nearby gyms controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to list nearby gyms', async () => {
		const { token } = await createAndAuthenticateUser(app)

		await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
			name: 'JavaScript Gym',
			description: 'Some description',
			phone: '11999999999',
			latitude: -27.2092052,
			longitude: -49.6401091,
		})

		await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
			name: 'TypeScript Gym',
			description: 'Some description',
			phone: '11999999982',
			latitude: -27.0610928,
			longitude: -49.5229501,
		})

		const response = await request(app.server)
			.get('/gyms/nearby')
			.set('Authorization', `Bearer ${token}`)
			.query({
				latitude: -27.2092052,
				longitude: -49.6401091,
			})
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.gyms).toHaveLength(1)
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				name: 'JavaScript Gym',
			}),
		])
	})
})
