import { Router } from 'express'
import { signin, signout, signup  , checkAuth , updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/signin' , signin)
router.post('/signup' ,signup)
router.post('/signout' , signout)
router.put('/update-profile', protectRoute , updateProfile)
router.get('/check-auth', protectRoute , checkAuth)


export default router