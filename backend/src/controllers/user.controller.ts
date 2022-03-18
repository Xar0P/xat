import { Request, Response } from 'express';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import { PostgrestError } from '@supabase/supabase-js';

import { Users } from '../models';

class User {
  async index(req: Request, res: Response) {
    const errors: string[] = [];

    try {
      const { data, error } = await Users.readAll();

      if (User.checkError(error, errors).length > 0) throw new Error();

      return res.json({
        data,
      });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }

  async show(req: Request, res: Response) {
    const errors: string[] = [];

    try {
      const { id } = req.params;
      const { data, error } = await Users.read('name, email, created_at', { id: Number(id) });

      if (User.checkError(error, errors).length > 0) throw new Error();

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

  async store(req: Request, res: Response) {
    const {
      name, email, password, errors,
    } = User.validations(req.body);

    try {
      if (errors.length > 0) throw new Error();

      if (name && email && password) {
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
      }

      return res.json({
        errors: [
          'Algum dos valores é inexistente',
        ],
      });
    } catch (error) {
      return res.status(400).json({
        errors,
        error,
      });
    }
  }

  async update(req: Request, res: Response) {
    if (User.bodyExists(req)) {
      return res.status(400).json({
        errors: ['Corpo da requisição não foi encontrado!'],
      });
    }

    const {
      name, email, errors,
    } = User.validations(req.body);

    const { id } = req.params;

    try {
      if (errors.length > 0) throw new Error();

      const { data, error } = await Users.update({
        name,
        email,
      }, { id: Number(id) });

      if (User.checkError(error, errors).length > 0) throw new Error();

      if (!data) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

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

  async deleteUser(req: Request, res: Response) {
    const errors: string[] = [];

    const { id } = req.params;

    try {
      const { data, error } = await Users.delete({ id: Number(id) });

      if (User.checkError(error, errors).length > 0) throw new Error();

      if (data?.length === 0) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

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

  private static validations({ name, email, password }: {
    name?: string, email?: string, password?: string
  }) {
    const errors: string[] = [];

    if (name) {
      if (!validator.isLength(name, { min: 5, max: 60 })) {
        errors.push('Nome deve ter entre 5 e 60 caracteres!');
      }
    }

    if (email) {
      if (!validator.isEmail(email)) {
        errors.push('Email inválido!');
      }

      if (!validator.isLength(email, { min: undefined, max: 254 })) {
        errors.push('Email está grande demais não acha?');
      }
    }

    if (password) {
      if (!validator.isLength(password, { min: 6, max: undefined })) {
        errors.push('Senha deve ter no mínimo 6 caracteres!');
      }
    }

    return {
      name, email, password, errors,
    };
  }

  private static checkError(error: PostgrestError | null, errors: any[]) {
    if (error && !Array.isArray(error)) {
      switch (error?.code) {
        case '23505':
          if (error.details.includes('name')) errors.push('Nome já existe');
          if (error.details.includes('email')) errors.push('Email já existe');
          return errors;

        default:
          errors.push(error);
          return errors;
      }
    }

    return [];
  }

  private static bodyExists(req: Request) {
    return Object.keys(req.body).length === 0;
  }
}

export default new User();
