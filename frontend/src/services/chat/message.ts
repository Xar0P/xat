import { v4 as uuid } from 'uuid';

export default class Message {
  public readonly id: string;

  public readonly message: string;

  public readonly senderID: number;

  public readonly date: number;

  constructor({ message, senderID }: { message: string, senderID: number }) {
    this.id = uuid();
    this.message = message;
    this.senderID = senderID;
    this.date = new Date().getTime();
  }
}
