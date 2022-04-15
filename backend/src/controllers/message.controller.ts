import { Request, Response } from 'express';

import { Messages } from '../models';
import { bodyExists, checkErrorInDB } from '../utils';

class Message {
  async store(req: Request, res: Response) {
    const errors: string[] = [];

    try {
      if (bodyExists(req)) {
        return res.status(400).json({
          errors: ['Corpo da requisição não foi encontrado!'],
        });
      }

      const {
        id, message, senderID, receiver, date,
      } = req.body;

      const { data, error } = await Messages.create({
        id,
        message,
        senderID,
        receiver,
        date,
      });

      if (checkErrorInDB(error, errors).length > 0) throw new Error();

      return res.json({
        data,
      });
    } catch (error) {
      return res.status(400).json({
        errors,
        error,
      });
    }
  }
}

export default new Message();
