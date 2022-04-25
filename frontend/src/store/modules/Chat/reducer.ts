/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  selectedUser: string | null,
  chatMessages: Array<chatMessage> | null,
}

const initialState = {
  selectedUser: null,
  chatMessages: null,
} as ChatState;

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectedUser(state, action: PayloadAction<string>) {
      const newState = { ...state };
      newState.selectedUser = action.payload;
      return newState;
    },
    addChatMessage(state, action: PayloadAction<chatMessage>) {
      const newState = { ...state };

      if (newState.chatMessages) {
        newState.chatMessages = [...newState.chatMessages, action.payload];
      } else {
        newState.chatMessages = [action.payload];
      }

      return newState;
    },
    // updateChatMessage(state, action: PayloadAction<chatMessage>) {
    //   const newState = { ...state };
    //   if (newState.chatMessages) {
    //     const newChatMessages = [...newState.chatMessages];
    //   }
    //   return newState;
    // }
  },
});

export const selectUserSelected = (state: State) => state.chat.selectedUser;
export const selectChatMessages = (state: State) => state.chat.chatMessages;
export const { selectedUser, addChatMessage } = chatSlice.actions;
export default chatSlice.reducer;
