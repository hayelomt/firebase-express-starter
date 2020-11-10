import { Router } from 'express';
import messageRoutes from './messages/messageRoutes';

const router = Router();

router.use('/messages', messageRoutes);

export default router;
