import { pgTable, pgEnum, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['sent', 'scheduled', 'failed', 'pending']);

export const emails = pgTable('emails', {
    id: uuid('id').primaryKey().defaultRandom(),
    to: text('to').notNull(),
    subject: text('subject').notNull(),
    body: text('body').notNull(),
    status: statusEnum('status').notNull(),
    scheduledAt: timestamp('scheduled_at', { withTimezone: true }),
    sentAt: timestamp('sent_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export type EmailStatus = 'sent' | 'scheduled' | 'failed';
