import { Router } from 'express';

import { User } from '../controllers';

const router = Router();
const {
  index, store, show, update,
} = User;

router.get('/', index);
router.get('/:id', show);

router.post('/', store);
router.put('/:id', update);

export default router;
