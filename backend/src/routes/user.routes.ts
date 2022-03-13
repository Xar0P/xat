import { Router } from 'express';

import { User } from '../controllers';

const router = Router();
const { index, store } = User;

router.get('/', index);

router.post('/', store);

export default router;
