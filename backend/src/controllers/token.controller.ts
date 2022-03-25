import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import {
  passwordIsValid,
  checkErrorInDB,
  validationUser,
} from '../utils';
import { Users } from '../models';

require('dotenv').config();

// Fazer mais testes
class Token {
  async store(req: Request, res: Response) {
    const {
      email, password, errors,
    } = validationUser(req.body);

    try {
      if (errors.length > 0) throw new Error();

      if (email && password) {
        const { data: user, error } = await Users.read('id, name, email, password', { email });

        if (checkErrorInDB(error, errors).length > 0) throw new Error();

        if (!user || user?.length === 0) {
          return res.status(406).json({
            errors: ['Usuário não existe'],
          });
        }

        const passwordHash = user[0].password;

        if (!(await passwordIsValid(password, passwordHash))) {
          return res.status(406).json({
            errors: ['Senha inválida'],
          });
        }

        const { id } = user[0];
        const token = jwt.sign({ id, email }, <string>process.env.TOKEN_SECRET, {
          expiresIn: <string>process.env.TOKEN_EXPIRATION,
        });

        return res.json({ token, user: { id, nome: user[0].name, email } });
      }

      return res.json({
        errors: [
          'Credenciais inválidas',
        ],
      });
    } catch (error) {
      return res.status(400).json({
        errors,
        error,
      });
    }
  }
}

export default new Token();
