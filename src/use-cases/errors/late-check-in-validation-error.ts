export class LateCheckInValidationError extends Error {
	constructor() {
		super('The check-in can only be valited up to 20 minutes after its creation.')
	}
}
