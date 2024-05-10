import { camelToSnake } from '~/tools/camel-to-snake'

interface NewTemplatePayload {
	name: string
	itemColor: string
}
export function newTemplateBuilder(payload: NewTemplatePayload) {
	/*
	This is used for creating a database model.
	*/
	const dateNow = new Date()

	return {
		name: payload.name,
		item_color: payload.itemColor,
		created_at: dateNow,
		updated_at: dateNow,
	}
}

interface UpdateTemplatePayload {
	name?: string
	itemColor?: string
}
export function updateTemplateBuilder(payload: UpdateTemplatePayload) {
	/*
	This is used for changing a domain model into a database model.
	*/

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

interface TemplatePayload {
	id: string
	name: string
	item_color: string
}
export function templateBuilder(payload: TemplatePayload) {
	/*
	This is used for changing a api model into a domain model.
	*/
	return {
		id: payload.id,
		name: payload.name,
		itemColor: payload.item_color,
	}
}
