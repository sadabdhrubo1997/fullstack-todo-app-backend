import { Router } from 'express';
import {
  userRegistrationController,
  userLoginController,
  userIsLoggedInController,
  userLogoutController,
} from '../controllers/user';

const router = Router();

router.post('/user/registration', userRegistrationController);
router.post('/user/login', userLoginController);

router.get('/user/isLoggedIn', userIsLoggedInController);
router.get('/user/logout', userLogoutController);

export default router;
