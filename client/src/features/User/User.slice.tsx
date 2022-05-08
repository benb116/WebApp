/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import type { RootState } from '../../app/store';
import { ErrHandler } from '../../helpers/util';
import UserAPI from './User.api';

interface UserState {
  info: {
    id: number | null,
    email: string,
    name: string,
  },
  redirect: string,
}
const defaultState: UserState = {
  info: {
    id: null,
    email: '',
    name: '',
  },
  redirect: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    set: (state, payload) => {
      state = { ...state, ...payload };
    },
    clearState: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = defaultState;
      localStorage.setItem('isLoggedIn', 'false');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(UserAPI.endpoints.signup.matchFulfilled, (state, { payload }) => {
      if (payload.needsVerification) {
        toast.success('Account created. Please check your email to verify your account.');
      } else {
        state.info = { ...state.info, ...payload };
        localStorage.setItem('isLoggedIn', 'true');
      }
    });
    builder.addMatcher(UserAPI.endpoints.signup.matchRejected, ErrHandler);

    builder.addMatcher(UserAPI.endpoints.forgot.matchFulfilled, () => {
      toast.success('An email was sent to this address');
    });
    builder.addMatcher(UserAPI.endpoints.forgot.matchRejected, ErrHandler);

    builder.addMatcher(UserAPI.endpoints.reset.matchFulfilled, () => {
      toast.success('Password reset successfully');
    });
    builder.addMatcher(UserAPI.endpoints.reset.matchRejected, ErrHandler);

    builder.addMatcher(UserAPI.endpoints.login.matchFulfilled, (state, { payload }) => {
      if (payload.needsVerification) {
        toast.success('Please check your email to verify your account.');
      } else {
        state.info = { ...state.info, ...payload };
        localStorage.setItem('isLoggedIn', 'true');
      }
    });
    builder.addMatcher(UserAPI.endpoints.login.matchRejected, ErrHandler);

    builder.addMatcher(UserAPI.endpoints.logout.matchFulfilled, (state) => {
      state.info = defaultState.info;
      localStorage.setItem('isLoggedIn', 'false');
    });
    builder.addMatcher(UserAPI.endpoints.logout.matchRejected, ErrHandler);
    builder.addMatcher(UserAPI.endpoints.forcelogout.matchFulfilled, (state) => {
      state.info = defaultState.info;
      localStorage.setItem('isLoggedIn', 'false');
    });
    builder.addMatcher(UserAPI.endpoints.forcelogout.matchRejected, ErrHandler);

    builder.addMatcher(UserAPI.endpoints.getAccount.matchFulfilled, (state, { payload }) => {
      if (!payload) {
        localStorage.setItem('isLoggedIn', 'false');
      } else {
        state.info = { ...state.info, ...payload };
      }
    });
    builder.addMatcher(UserAPI.endpoints.getAccount.matchRejected, (state, resp) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (resp.error.message === 'Aborted due to condition callback returning false.') return;
      state = defaultState;
      localStorage.setItem('isLoggedIn', 'false');
    });
  },
});

export const { set, clearState } = userSlice.actions;
export const userSelector = (state: RootState) => state.user.info;
export const isLoggedInSelector = () => (localStorage.getItem('isLoggedIn') === 'true');
