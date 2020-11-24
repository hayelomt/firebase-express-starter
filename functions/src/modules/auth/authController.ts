import { Request, Response } from 'express';
import catchAsync from '../../lib/catchAsync';
import { admin, firebase } from '../../lib/firebase';

export default class AuthController {
  login() {
    return catchAsync(async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const data = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      const token = await admin
        .auth()
        .createCustomToken(data.user?.uid as string);

      res.json({ data, token });
    });
  }
}
