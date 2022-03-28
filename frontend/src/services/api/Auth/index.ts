import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3333/';

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
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useRegisterUserMutation } = authApi;
