import { Request, Response } from 'express';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import { PostgrestError } from '@supabase/supabase-js';

import supabase from '../config/supabase';
import { Users } from '../models';

class User {
  async index(req: Request, res: Response) {
    res.send('Opa');
  }

  async store(req: Request, res: Response) {
    const {
      name, email, password, errors,
    } = User.validations(req.body);

    try {
      if (errors.length > 0) throw new Error();

      const salt = await bcryptjs.genSalt();
      const passwordHash = bcryptjs.hashSync(password, salt);

      // Criando na DB
      const { data, error } = await Users.create({
        name,
        email,
        password: passwordHash,
      });

      if (User.checkError(error, errors).length > 0) throw new Error();

      return res.json({
        data,
      });
    } catch (error) {
      return res.json({
        errors,
      });
    }
  }

  private static validations({ name, email, password }: {
    name: string, email: string, password: string
  }) {
    const errors: string[] = [];

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

  private static checkError(error: PostgrestError | null, errors: string[]) {
    switch (error?.code) {
      case '23505':
        if (error.details.includes('name')) errors.push('Nome já existe');
        if (error.details.includes('email')) errors.push('Email já existe');
        return errors;

      default:
        break;
    }

    return [];
  }
}

export default new User();
