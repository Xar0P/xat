/* eslint-disable no-unused-vars */
interface chatMessage {
  [userID: string]: Array<MessageResponse>
}

interface State {
  authApi: {},
  reducer: {
    user: {
      token: string,
    }
  }
  chat: {
    selectedUser: string
    chatMessages: Array<chatMessage>
  }
}
