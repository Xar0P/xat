import { Messages } from '../models';

class Message {
  async store({
    id,
    message,
    sender,
    receiver,
    date,
  }: {
    id: string,
    message: string,
    sender: number,
    receiver: number,
    date: number
  }) {
    try {
      const { data, error } = await Messages.create({
        id,
        message,
        sender,
        receiver,
        date,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Message();
