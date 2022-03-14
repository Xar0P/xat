import supabase from '../config/supabase';

interface User {
  name: string,
  email: string,
  password: string
}

class Users {
  async create(user: User) {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      ]);

    return { data, error };
  }

  async read(query: keyof User | 'id' | '*') {
    const { data, error } = await supabase
      .from('users')
      .select(query);

    return { data, error };
  }
}

export default new Users();
