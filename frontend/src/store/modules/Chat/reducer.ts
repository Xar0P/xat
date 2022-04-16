/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  selectedUser: string | null,
}

const initialState = {
  selectedUser: null,
} as ChatState;

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectedUser(state, action: PayloadAction<string>) {
      state.selectedUser = action.payload;
    },
  },
});

export const selectUserSelected = (state: State) => state.chat.selectedUser;
export const { selectedUser } = chatSlice.actions;
export default chatSlice.reducer;
