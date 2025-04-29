import { Request, Response } from 'express';
import { db } from '../config/db';
import { emailQueue } from '../jobs/index';
import { emails } from '../schema/email';

export async function schedule(req: Request, res: Response): Promise<any> {
    const { to, subject, body, scheduledAt } = req.body;
    try {
        // Insert email data into the database with a 'scheduled' status
        const inserted = await db.insert(emails).values({
            to,
            subject,
            body,
            scheduledAt,
            status: 'scheduled',
        }).returning();

        // Calculate delay based on scheduled time
        const delay = new Date(scheduledAt).getTime() - Date.now();

        // Add to email queue with delay and retry attempts
        await emailQueue.add('send-email', {
            email: inserted[0], // drizzle returns array, using the first inserted entry
        }, {
            delay,
            attempts: 3,
        });

        // Respond with the inserted email data
        res.status(200).json(inserted);
    } catch (error) {
        res.sendStatus(500);
    }
}


// You would then need to set up a separate worker process (or multiple workers) to consume jobs from the `emailQueue` and execute the corresponding tasks. The `bullmq` library provides methods for processing jobs from the queue, handling job completion, retrying failed jobs, and more.

