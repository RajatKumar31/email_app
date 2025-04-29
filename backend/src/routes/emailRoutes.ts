import { Router } from 'express';
import { listEmails } from '../controllers/emailList';
import { sendNow } from '../controllers/sendEmail';
import { schedule } from '../controllers/scheduleEmail';

const router = Router();

router.get('/', listEmails);
router.post('/send', sendNow);
router.post('/schedule', schedule);

export default router;
