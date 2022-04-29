import dotenv from 'dotenv';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

dotenv.config();
const baseUrl = process.env.BACKEND_URL;

interface User {
  name: string,
  email: string,
  password: string,
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: 'users',
        method: 'GET',
      }),
    }),
    registerUser: builder.mutation({
      query: (user: User) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (userLogin: Pick<User, 'email' | 'password'>) => ({
        url: 'tokens',
        method: 'POST',
        body: userLogin,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useRegisterUserMutation, useLoginUserMutation } = authApi;
