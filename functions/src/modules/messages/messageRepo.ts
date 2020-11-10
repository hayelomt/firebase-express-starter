import { check } from 'express-validator';
import { rtdb } from '../../lib/admin';
import { NewData } from '../../lib/sharedTypes';

export interface Message {
  title: string;
  message: string;
}

export default class MessageRepo {
  messageRef = rtdb.ref('/messages');

  async create(data: Message): Promise<NewData<Message>> {
    const newMessageRef = this.messageRef.push();
    await newMessageRef.set(data);

    return { id: newMessageRef.key, data };
  }

  static validationRules() {
    return [
      check('title').isString().withMessage('Title Required'),
      check('message').isString().withMessage('Message Required'),
    ];
  }
}
