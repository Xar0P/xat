import { Router } from 'express';

import { Message } from '../controllers';

const router = Router();
const { store, show } = Message;

router.get('/', show);
router.post('/', store);

export default router;
