import { Request, Response } from 'express';
import { db } from '../config/db';
import { emails } from '../schema/email';
import { desc } from 'drizzle-orm';

export async function listEmails(req: Request, res: Response): Promise<any> {
    try {
        let { page, limit } = req.query;
        const pageNum = Number(page) || 1;
        const limitNum = Number(limit) || 10;
        const offset = (pageNum - 1) * limitNum;

        const data = await db.select().from(emails)
            .orderBy(desc(emails.sentAt))
            .limit(limitNum)
            .offset(offset);
        return res.status(200).json({ data });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
