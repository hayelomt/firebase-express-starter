import { Router } from 'express';
import messageRoutes from './messages/messageRoutes';

const router = Router();

router.get('/', (req, res) => {
  res.json({ msg: 'hello' });
});

router.use('/messages', messageRoutes);

export default router;
