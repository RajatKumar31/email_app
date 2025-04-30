import { Request, Response } from 'express';
import { db } from '../config/db';
import { emails } from '../schema/email';
import { emailQueue } from '../jobs/emailQueue';

export async function sendNow(req: Request, res: Response): Promise<any> {
    const { to, subject, body } = req.body;
    try {
        // Insert email into DB (with status 'pending')
        const insertedEmail = await db.insert(emails).values({
            to,
            subject,
            body,
            status: 'pending',
        }).returning();

        // Push to queue
        await emailQueue.add('send-email', { email: insertedEmail[0] }, { attempts: 3 });

        // Return the inserted email record as a response
        return res.status(200).json(insertedEmail);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
