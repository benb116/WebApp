import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/User/User.slice';

import API from '../helpers/api';

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(API.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
