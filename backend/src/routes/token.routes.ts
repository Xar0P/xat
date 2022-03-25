import { Router } from 'express';

import { Token } from '../controllers';

const router = Router();
const { store } = Token;

router.post('/', store);

export default router;
