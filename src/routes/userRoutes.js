import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/LoginMidlleware';

const router = new Router();

// não deveria existir
// router.get('/', userController.index);
// router.get('/:id', userController.show);

router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;
