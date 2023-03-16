import { Router } from 'express';
import PhotoController from '../controllers/PhotoController';
import loginRequired from '../middlewares/LoginMidlleware';

const router = new Router();

router.post('/', loginRequired, PhotoController.store);

export default router;
