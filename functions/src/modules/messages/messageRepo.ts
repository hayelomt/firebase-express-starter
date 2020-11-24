import { check } from 'express-validator';
import { rtdb } from '../../lib/firebase';
import { NewData } from '../../lib/sharedTypes';

export interface Message {
  title: string;
  message: string;
}

export default class MessageRepo {
  private _messageRef = rtdb.ref('/messages');

  get messageRef() {
    return this._messageRef;
  }

  async create(data: Message): Promise<NewData<Message>> {
    const newMessageRef = this._messageRef.push();
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
