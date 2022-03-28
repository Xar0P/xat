import validator from 'validator';

export function validationUser({ name, email, password }: {
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

  return errors;
}
