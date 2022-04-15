/* eslint-disable no-unused-vars */
declare interface User {
  id: number,
  email: string,
  name: string,
}

declare interface UserResponse {
  userID: number,
  socketID: string,
  userName: string,
}

declare interface MessageResponse {
  id: string,
  message: string,
  receiver: number,
  sender: number,
  date: number
}
