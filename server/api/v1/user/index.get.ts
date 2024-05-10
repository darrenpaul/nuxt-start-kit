import { serverSupabaseClient } from '#supabase/server'
import { USER } from '@/constants/database-tables'
import { userBuilder } from '~/tools/database/builder/user'

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
			statusCode: 404,
			statusMessage: 'User not found',
		})
	}

	const { data: userData, error: userError } = await supabase
		.from(USER)
		.select('id, name, membership, currency (id, symbol)')
		.eq('id', user.id)
		.single()

	if (userError) {
		throw createError({
			statusCode: Number(userError.code),
			statusMessage: userError.message,
		})
	}

	if (!userData) {
		throw createError({
			statusCode: 404,
			statusMessage: 'User not found',
		})
	}

	return {
		user: userBuilder(userData),
	}
})
