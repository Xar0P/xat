import supabase from '../config/supabase';

export interface User {
  name: string,
  email: string,
  password: string,
}

export interface UserDB extends User {
  id: number
  created_at: string
}

class Users {
  async create(user: User) {
    const { data, error }: { data: UserDB[] | null, error: any } = await supabase
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

  async read(query: keyof UserDB | '*') {
    const { data, error }: { data: UserDB[] | null, error: any } = await supabase
      .from('users')
      .select(query);

    return { data, error };
  }

  async update(newUser: Partial<User>, query: Partial<UserDB>) {
    const { data, error } = await supabase
      .from('users')
      .update(newUser)
      .match(query);

    return { data, error };
  }

  async delete(query: Partial<UserDB>) {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .match(query);

    return { data, error };
  }
}

export default new Users();
