/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import { addToken, removeToken } from './actions';

const initialState = {
  token: '',
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToken, (state, action) => {
      state.token = action.payload;
    })
    .addCase(removeToken, (state) => {
      state.token = '';
    });
});

export default userReducer;
