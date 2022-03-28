import { createAction } from '@reduxjs/toolkit';

export const addToken = createAction<string>('ADD_TOKEN');
export const removeToken = createAction('REMOVE_TOKEN');
