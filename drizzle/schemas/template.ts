import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { user } from './user'

export const template = pgTable('budget', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: text('name').notNull(),
	itemColor: text('item_color').notNull(),
	userId: uuid('user_id').references(() => user.id),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
})
