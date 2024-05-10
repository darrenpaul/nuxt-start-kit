export function camelToSnake(value: string): string {
	return value.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`)
}
