import { Router } from 'express';

import { Message } from '../controllers';

const router = Router();
const { store } = Message;

router.post('/', store);

export default router;
