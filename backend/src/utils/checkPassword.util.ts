import bcryptjs from 'bcryptjs';

export function passwordIsValid(password: string, passwordHash: string) {
  return bcryptjs.compare(password, passwordHash);
}
