import { createAction, createReducer } from '@reduxjs/toolkit';

export const clickedInButton = createAction('clickedinbutton');

const initialState = {
  isClicked: false,
};

const testReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(clickedInButton, (state, action) => {
      const newState = { ...state };
      newState.isClicked = !newState.isClicked;
      return newState;
    });
});

export default testReducer;
