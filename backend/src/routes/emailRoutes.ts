import { Router } from 'express';
import { listEmails } from '../controllers/emailList';
import { sendEmail } from '../controllers/sendEmail';
import { scheduleEmail } from '../controllers/scheduleEmail';

const router = Router();

router.get('/', listEmails);
router.post('/send', sendEmail);
router.post('/schedule', scheduleEmail);

export default router;
