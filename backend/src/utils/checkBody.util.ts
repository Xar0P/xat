import { Request } from 'express';

export function bodyExists(req: Request) {
  return Object.keys(req.body).length === 0;
}
