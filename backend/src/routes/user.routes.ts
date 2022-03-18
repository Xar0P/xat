import { Router } from 'express';

import { User } from '../controllers';

const router = Router();
const {
  index, store, show, update, deleteUser,
} = User;

router.get('/', index);
router.get('/:id', show);

router.post('/', store);
router.put('/:id', update);
router.delete('/:id', deleteUser);

export default router;
