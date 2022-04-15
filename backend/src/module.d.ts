/* eslint-disable no-unused-vars */
export interface Message {
  id: string,
  message: string,
  senderID: number,
  receiver: number,
  date: number
}

export interface UserSocket {
  id: number,
  email: string,
  name: string,
}
