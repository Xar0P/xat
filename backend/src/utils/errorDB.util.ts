import { PostgrestError } from '@supabase/supabase-js';

export function checkErrorInDB(error: PostgrestError | null, errors: any[]) {
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
