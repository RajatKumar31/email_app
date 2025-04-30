import { Request, Response } from 'express';
import { db } from '../config/db';
import { emails } from '../schema/email';
import { desc, sql } from 'drizzle-orm';

export async function listEmails(req: Request, res: Response): Promise<any> {
    try {
        let { page, limit } = req.query;
        const pageNum = Number(page) || 1;
        const limitNum = Number(limit) || 10;
        const offset = (pageNum - 1) * limitNum;

        const data = await db.select().from(emails)
            .orderBy(desc(emails.createdAt))
            .limit(limitNum)
            .offset(offset);

        const [{ count }] = await db
            .select({ count: sql<number>`count(*)` })
            .from(emails)

        const totalItems = Number(count);
        const totalPages = Math.ceil(totalItems / limitNum);

        return res.status(200).json({ totalItems, totalPages, data });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
