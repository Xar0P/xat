import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import { bodyExists, checkErrorInDB, validationUser } from '../utils';
import { Users } from '../models';

class User {
  async index(req: Request, res: Response) {
    const errors: string[] = [];

    try {
      const { data, error } = await Users.readAll();

      if (checkErrorInDB(error, errors).length > 0) throw new Error();

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

  async store(req: Request, res: Response) {
    const {
      name, email, password, errors,
    } = validationUser(req.body);

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

        if (checkErrorInDB(error, errors).length > 0) throw new Error();

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
    if (bodyExists(req)) {
      return res.status(400).json({
        errors: ['Corpo da requisição não foi encontrado!'],
      });
    }

    const {
      name, email, errors,
    } = validationUser(req.body);

    const { id } = req.params;

    try {
      if (errors.length > 0) throw new Error();

      const { data, error } = await Users.update({
        name,
        email,
      }, { id: Number(id) });

      if (checkErrorInDB(error, errors).length > 0) throw new Error();

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

      if (checkErrorInDB(error, errors).length > 0) throw new Error();

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
}

export default new User();
