import supabase from '../config/supabase';

import { Message } from '../module';

class Messages {
  async create(message: Message) {
    const { data, error }: { data: Message[] | null, error: any } = await supabase
      .from('messages')
      .insert([
        {
          id: message.id,
          message: message.message,
          sender: message.sender,
          receiver: message.receiver,
          date: message.date,
        },
      ]);

    return { data, error };
  }

  async read(columns: string, query: Partial<Message>) {
    const { data, error }: { data: Message[] | null, error: any } = await supabase
      .from('messages')
      .select(columns)
      .match(query);

    return { data, error };
  }

  async readAll() {
    const { data, error }: { data: Message[] | null, error: any } = await supabase
      .from('messages')
      .select('*');

    return { data, error };
  }

  async update(newMessage: Partial<Message>, query: Partial<Message>) {
    const { data, error } = await supabase
      .from('messages')
      .update(newMessage)
      .match(query);

    return { data, error };
  }

  async delete(query: Partial<Message>) {
    const { data, error } = await supabase
      .from('messages')
      .delete()
      .match(query);

    return { data, error };
  }
}

export default new Messages();
