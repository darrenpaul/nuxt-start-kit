import type { DomainUser } from '~/models/user'
import type { NewUser } from '~/server/models/user'
import { camelToSnake } from '~/tools/camel-to-snake'


interface NewUserPayload {
	id: string
	firstName: string
	lastName: string
	age: number
}
export function newUserBuilder(payload: NewUserPayload): NewUser {
	const dateNow = new Date()

	return {
		id: payload.id,
		first_name: payload.firstName,
		last_name: payload.lastName,
		age: payload.age,
		created_at: dateNow,
		updated_at: dateNow,
	}
}

interface UserPayload {
	id: string
	first_name: string
	last_name: string
	age: number
}
export function userBuilder(payload: UserPayload): DomainUser {
	return {
		id: payload.id,
		firstName: payload.first_name,
		lastName: payload.last_name,
		age: payload.age,
	}
}

interface UpdateUserPayload {
	id: string
	firstName?: string
	lastName?: string
	age?: number
}
export function updateUserBuilder(payload: UpdateUserPayload): DomainUser {
	const dateNow = new Date()

	const updatedValues: { [key: string]: string | Date | number } = {
		updated_at: dateNow,
	}

	Object.entries(payload).forEach(([key, value]) => {
		if (value !== undefined) {
			const keySnakeCase = camelToSnake(key)

			updatedValues[keySnakeCase] = value
		}
	})

	return updatedValues
}