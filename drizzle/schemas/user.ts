import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
	id: uuid('id').defaultRandom().primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	age: text('age').notNull(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
})
