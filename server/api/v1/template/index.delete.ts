import { serverSupabaseClient } from '#supabase/server'
import { TEMPLATE } from '@/constants/database-tables'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const { id } = JSON.parse(body)

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

	const { error: templateError } = await supabase
		.from(TEMPLATE)
		.delete()
		.eq('id', id)

	if (templateError) {
		throw createError({
			statusCode: Number(templateError.code),
			statusMessage: templateError.message,
		})
	}

	return {
		message: 'Template deleted successfully.',
	}
})
