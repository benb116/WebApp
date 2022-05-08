import BaseAPI from '../../helpers/api';
import {
  AccountType,
  ForgotType,
  LoginInputType,
  ResetInputType,
  SignupInputType,
  SignupType,
} from './User.types';

const UserAPI = BaseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAccount: build.query<AccountType, void>({
      query: () => '/auth/account',
      providesTags: ['Account'],
    }),
    signup: build.mutation<SignupType, SignupInputType>({
      query: (body) => ({ url: '/auth/signup', method: 'POST', body }),
    }),
    login: build.mutation<SignupType, LoginInputType>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
    forgot: build.mutation<void, ForgotType>({
      query: (body) => ({ url: '/auth/forgot', method: 'POST', body }),
    }),
    reset: build.mutation<void, ResetInputType>({
      query: (body) => ({ url: '/auth/resetPasswordToken', method: 'POST', body }),
    }),
    logout: build.mutation<void, void>({ query: () => ({ url: '/auth/logout', method: 'DELETE' }) }),
    forcelogout: build.mutation<void, void>({ query: () => ({ url: '/auth/forcelogout', method: 'DELETE' }) }),
  }),
});

export const {
  useGetAccountQuery,
  useLoginMutation,
  useLogoutMutation,
  useForcelogoutMutation,
  useSignupMutation,
  useForgotMutation,
  useResetMutation,
} = UserAPI;

export default UserAPI;
