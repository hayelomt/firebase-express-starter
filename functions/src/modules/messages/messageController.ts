import { Request, Response } from 'express';
import MessageRepo from './messageRepo';
import catchAsync from '../../lib/catchAsync';

export default class MessageController {
  repo: MessageRepo;

  constructor() {
    this.repo = new MessageRepo();
  }

  store() {
    return catchAsync(async (req: Request, res: Response) => {
      const { title, message } = req.body;
      const newMsg = await this.repo.create({ title, message });

      res.status(201).json({ data: newMsg });
    });
  }
}
