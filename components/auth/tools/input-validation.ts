import isEmail from 'validator/lib/isEmail'

const PASSWORD_MIN_LENGTH = 4

export function isNameValid(value: string | undefined): boolean {
	if (!value)
		return false

	return value.length > 0
}

export function isEmailValid(value: string | undefined): boolean {
	if (!value)
		return false
	return isEmail(value)
}

export function isPasswordValid(value: string | undefined): boolean {
	if (!value)
		return false

	return value.length > PASSWORD_MIN_LENGTH
}
