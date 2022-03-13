import { Request, Response } from 'express';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

import supabase from '../config/supabase';

class User {
  async index(req: Request, res: Response) {
    res.send('Opa');
  }

  async store(req: Request, res: Response) {
    const {
      name, email, password, errors,
    } = User.validations(req.body);

    if (errors.length > 0) return res.json(errors);

    const salt = await bcryptjs.genSalt();
    const passwordHash = bcryptjs.hashSync(password, salt);

    const { data: users, error } = await supabase
      .from('users')
      .select('*');

    // eslint-disable-next-line no-console
    console.log(users, error);

    return res.json({
      name,
      email,
      passwordHash,
    });
    // try {

    // } catch (e) {
    //   console.error(e);
    // }
  }

  private static validations({ name, email, password }: {
    name: string, email: string, password: string
  }) {
    const errors = [];

    if (!validator.isLength(name, { min: 5, max: 60 })) {
      errors.push('Nome deve ter entre 5 e 60 caracteres!');
    }

    if (!validator.isEmail(email)) {
      errors.push('Email inválido!');
    }

    if (!validator.isLength(email, { min: undefined, max: 254 })) {
      errors.push('Email está grande demais não acha?');
    }

    if (!validator.isLength(password, { min: 6, max: undefined })) {
      errors.push('Senha deve ter no mínimo 6 caracteres!');
    }

    return {
      name, email, password, errors,
    };
  }
}

export default new User();
