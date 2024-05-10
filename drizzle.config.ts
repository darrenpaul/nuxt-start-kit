import type { Config } from 'drizzle-kit'

export default {
	schema: './drizzle/schema.ts',
	out: './drizzle/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.SB_POSTGRES_CONNECTION_STRING!,
	},
} satisfies Config
