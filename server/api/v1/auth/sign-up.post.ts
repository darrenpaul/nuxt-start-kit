import { serverSupabaseClient } from '#supabase/server'
import { USER } from '@/constants/database-tables'
import { newUserBuilder } from '~/tools/database/builder/user'

interface Credentials {
	email: string
	password: string
}

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const { name, email, password } = JSON.parse(body)

	if (!email || !password || !name) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Fields are missing',
		})
	}

	const supabase = await serverSupabaseClient(event)

	const credentials: Credentials = {
		email,
		password,
	}

	const {
		data: {
			user: { id },
		},
		error: authError,
	} = await supabase.auth.signUp(credentials)

	if (authError) {
		throw createError({
			statusCode: Number(authError.code),
			statusMessage: authError.message,
		})
	}

	const newUser = newUserBuilder({ id, name })

	const { error: insertError } = await supabase.from(USER).insert(newUser)

	if (insertError) {
		await supabase.auth.admin.deleteUser(id)

		throw createError({
			statusCode: Number(insertError.code),
			statusMessage: insertError.message,
		})
	}

	return {
		message: 'User created',
	}
})
