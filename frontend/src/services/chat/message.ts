import { v4 as uuid } from 'uuid';

export default class Message {
  public readonly id: string;

  public readonly message: string;

  public readonly sender: string;

  public readonly date: number;

  constructor({ message, sender }: { message: string, sender: string }) {
    this.id = uuid();
    this.message = message;
    this.sender = sender;
    this.date = new Date().getTime();
  }
}
