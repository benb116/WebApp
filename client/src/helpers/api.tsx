// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AccountType, SignupType } from '../features/User/User.types';

// Define a service using a base URL and expected endpoints
const API = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({ baseUrl: '/app' }),
  endpoints: (build) => ({
    // User
    getAccount: build.query<AccountType, void>({ query: () => '/auth/account' }),
    signup: build.mutation<SignupType, { name: string, email: string, password: string, skipVerification: boolean, }>({
      query: (body) => ({ url: '/auth/signup', method: 'POST', body }),
    }),
    login: build.mutation<SignupType, { email: string, password: string }>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
    forgot: build.mutation<void, { email: string }>({
      query: (body) => ({ url: '/auth/forgot', method: 'POST', body }),
    }),
    reset: build.mutation<void, { token: string, password: string, confirmPassword: string }>({
      query: (body) => ({ url: '/auth/resetPasswordToken', method: 'POST', body }),
    }),
    logout: build.mutation<void, void>({ query: () => ({ url: '/auth/logout', method: 'DELETE' }) }),
  }),
});

export default API;

export const {
  useGetAccountQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useForgotMutation,
  useResetMutation,
} = API;
