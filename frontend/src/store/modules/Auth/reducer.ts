/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string,
}

const initialState = {
  token: '',
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    removeToken(state) {
      state.token = '';
    },
  },
});

export const selectToken = (state: State) => state.reducer.user.token;
export const { addToken, removeToken } = userSlice.actions;
export default userSlice.reducer;
