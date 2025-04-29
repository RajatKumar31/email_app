import { Request, Response } from 'express';
import { db } from '../config/db';
import { emails } from '../schema/email';

export async function listEmails(req: Request, res: Response): Promise<any> {
    try {
        const data = await db.select().from(emails);
        return res.status(200).json({ data });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
