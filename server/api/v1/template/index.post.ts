import { serverSupabaseClient } from '#supabase/server'
import { TEMPLATE } from '@/constants/database-tables'
import { templateBuilder, newTemplateBuilder } from '~/tools/database/builder/template-builder'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const { name, itemColor }
		= JSON.parse(body)

	if (!name || !itemColor) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required fields.',
		})
	}

	const supabase = await serverSupabaseClient(event)

	const {
		data: { user },
		error: userAuthError,
	} = await supabase.auth.getUser()

	if (userAuthError || !user) {
		throw createError({
			statusCode: Number(userAuthError.code),
			statusMessage: userAuthError.message,
		})
	}

	const newTemplate = newTemplateBuilder({
		name,
		itemColor,
	})

	const { data: templateData, error: templateError } = await supabase
		.from(TEMPLATE)
		.insert(newTemplate)
		.select('id, name, item_color')
		.single()

	if (templateError) {
		throw createError({
			statusCode: Number(templateError.code),
			statusMessage: templateError.message,
		})
	}

	if (!templateData) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to create template.',
		})
	}

	return {
		template: templateBuilder(templateData),
	}
})
