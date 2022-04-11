// /* eslint-disable no-param-reassign */
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Socket } from 'socket.io-client';

// interface ChatState {
//   socket: Socket | null,
// }

// const initialState = {
//   socket: null,
// } as ChatState;

// const chatSlice = createSlice({
//   name: 'chat',
//   initialState,
//   reducers: {
//     newSocket(state, action: PayloadAction<any>) {
//       console.log(action);
//       state.socket = action.payload;
//     },
//     removeSocket(state) {
//       state.socket = null;
//     },
//   },
// });

// export const selectSocket = (state: State) => state.reducer.chat.socket;
// export const { newSocket, removeSocket } = chatSlice.actions;
// export default chatSlice.reducer;
