import express from 'express';
import { Router } from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getUsersForSidebar  , getMessages , sendMessage} from '../controllers/message.controller.js';
const router = Router();

router.get('/users' , protectRoute , getUsersForSidebar)
router.get('/:id' , protectRoute , getMessages)
router.post('/message/:id' , protectRoute , sendMessage)

export default router;