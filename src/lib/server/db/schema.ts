import {
	boolean,
	date,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid
} from 'drizzle-orm/pg-core';
import { user } from './auth.schema';
import { relations } from 'drizzle-orm';

export * from './auth.schema';

export const roleType = pgEnum('role_type', ['admin', 'manager', 'user']);

export const breakType = pgEnum('break_type', ['short', 'medium', 'long']);

export const qrPoints = pgTable('qr_points', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull().unique(),
	code: text('code').notNull().unique(),
	isActive: boolean('is_active').notNull().default(true),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export const shifts = pgTable(
	'shifts',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		workDate: date('work_date').notNull(),
		startMin: integer('start_min'),
		endMin: integer('end_min')
	},
	(table) => [uniqueIndex('shifts_user_date_key').on(table.userId, table.workDate)]
);

export const breaks = pgTable('breaks', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	qrPointId: uuid('qr_point_id')
		.notNull()
		.references(() => qrPoints.id, { onDelete: 'restrict' }),
	workDate: date('work_date').notNull(),
	type: breakType('type').notNull().default('short'),
	startedAt: timestamp('started_at', { withTimezone: true }).notNull().defaultNow(),
	endsAt: timestamp('ends_at', { withTimezone: true }).notNull(),
	endedAt: timestamp('ended_at', { withTimezone: true })
});

export const userRelations = relations(user, ({ many }) => ({
	shifts: many(shifts),
	breaks: many(breaks)
}));

export const qrPointsRelations = relations(qrPoints, ({ many }) => ({
	breaks: many(breaks)
}));

export const shiftsRelations = relations(shifts, ({ one }) => ({
	user: one(user, { fields: [shifts.userId], references: [user.id] })
}));

export const breaksRelations = relations(breaks, ({ one }) => ({
	user: one(user, { fields: [breaks.userId], references: [user.id] }),
	qrPoint: one(qrPoints, { fields: [breaks.qrPointId], references: [qrPoints.id] })
}));

export type QrPoint = typeof qrPoints.$inferSelect;
export type NewQrPoint = typeof qrPoints.$inferInsert;

export type Shift = typeof shifts.$inferSelect;
export type NewShift = typeof shifts.$inferInsert;

export type Break = typeof breaks.$inferSelect;
export type NewBreak = typeof breaks.$inferInsert;

export type BreakType = (typeof breakType.enumValues)[number];
