import { Worker } from 'bullmq';
import { redis } from '../config/redis';
import { resend } from '../config/resend';
import { db } from '../config/db';
import { emails } from '../schema/email';
import { eq } from 'drizzle-orm';

export const emailWorker = new Worker(
    'emailQueue',
    async job => {
        const { email } = job.data;

        try {
            const result = await resend.emails.send({
                to: email.to,
                from: 'onboarding@resend.dev',
                subject: email.subject,
                html: email.body,
            });

            let status = result.data?.id ? "sent" : "failed";

            await db.update(emails).set({ status, sentAt: new Date() }).where(eq(emails.id, email.id));
        } catch (err: any) {
            console.log(err.message);
        }
    },
    { connection: redis }
);
