import { serverSupabaseClient } from '#supabase/server'
import { USER } from '@/constants/database-tables'
import { updateUserBuilder, userBuilder } from '~/tools/database/builder/user'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const { id, name, currencyId } = JSON.parse(body)

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
			statusMessage: 'User not found.',
		})
	}

	const updateUser = updateUserBuilder({ name, currencyId })

	const { data: userData, error: userError } = await supabase.from(USER).update(updateUser).eq('id', id).select('id, name, membership, currency (id, symbol)').single()

	if (userError) {
		throw createError({
			statusCode: Number(userError.code),
			statusMessage: userError.message,
		})
	}

	return {
		user: userBuilder(userData),
	}
})
