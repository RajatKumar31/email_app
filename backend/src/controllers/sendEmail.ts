import { Request, Response } from 'express';
import { resend } from '../config/resend';
import { db } from '../config/db';
import { emails } from '../schema/email';
import { EmailStatus } from '../schema/email';

export async function sendNow(req: Request, res: Response): Promise<any> {
    const { to, subject, body } = req.body;
    try {
        // Send email using resend service
        const result = await resend.emails.send({
            to,
            from: 'onboarding@resend.dev',
            subject,
            html: body,
        });

        let status: EmailStatus = result.data?.id ? "sent" : "failed";

        // Insert email record into the database
        const insertedEmail = await db.insert(emails).values({
            to,
            subject,
            body,
            status,
            sentAt: new Date(),
        }).returning();

        // Return the inserted email record as a response
        return res.status(200).json(insertedEmail);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
