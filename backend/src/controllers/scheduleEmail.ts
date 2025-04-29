import { Request, Response } from 'express';
import { db } from '../config/db';
import { emailQueue } from '../jobs/index';
import { emails } from '../schema/email';

export async function schedule(req: Request, res: Response): Promise<any> {
    const { to, subject, body, scheduledAt } = req.body;
    try {
        // Insert email data into the database with a 'scheduled' status
        const insertedEmail = await db.insert(emails).values({
            to,
            subject,
            body,
            scheduledAt,
            status: 'scheduled',
        }).returning();

        // Calculate delay based on scheduled time
        const delay = new Date(scheduledAt).getTime() - Date.now();

        // Add to email queue with delay and retry attempts
        await emailQueue.add('send-email', { email: insertedEmail[0] }, { delay, attempts: 3 });

        // Respond with the inserted email data
        return res.status(200).json(insertedEmail);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
