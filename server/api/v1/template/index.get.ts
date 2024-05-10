import { serverSupabaseClient } from '#supabase/server'
import { TEMPLATE } from '@/constants/database-tables'
import { templateBuilder } from '~/tools/database/builder/template-builder'

export default defineEventHandler(async (event) => {
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

	const { data: templateDate, error: templateError } = await supabase.from(TEMPLATE).select('id, name, item_color').eq('user_id', user.id)

	if (templateError) {
		throw createError({
			statusCode: Number(templateError.code),
			statusMessage: templateError.message,
		})
	}

	const templates = templateDate.map(template => templateBuilder(template))

	return {
		templates,
	}
})
