import { Router } from 'express';
import { login } from '../controllers/authController';
import { testController } from '../controllers/testController';

const router = Router();

router.post('/login', login);

router.get('/test', testController);

export default router;
