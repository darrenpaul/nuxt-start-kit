import { serverSupabaseClient } from '#supabase/server'
import { TEMPLATE } from '@/constants/database-tables'
import { templateBuilder, updateTemplateBuilder } from '~/tools/database/builder/template-builder'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const { id, name, itemColor } = JSON.parse(body)

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required fields.',
		})
	}

	const supabase = await serverSupabaseClient(event)

	const { data: { user }, error: userAuthError } = await supabase.auth.getUser()

	if (userAuthError) {
		throw createError({
			statusCode: Number(userAuthError.code),
			statusMessage: userAuthError.message,
		})
	}

	if (!user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		})
	}

	const updateTemplate = updateTemplateBuilder({ name, itemColor })

	const { data: templateData, error: templateError } = await supabase.from(TEMPLATE).update(updateTemplate).eq('id', id).select('id, name, item_color').single()

	if (templateError) {
		throw createError({
			statusCode: Number(templateError.code),
			statusMessage: templateError.message,
		})
	}

	return {
		template: templateBuilder(templateData)
	}
})
