import { isRejectedWithValue } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

interface ErrType {
  data: {
    error: string,
  },
  status: number,
}

export const ErrHandler = (_state: unknown, action: { payload: ErrType | unknown }) => {
  if (isRejectedWithValue(action)) {
    const err = (action.payload as ErrType);
    if (err.status === 401) {
      localStorage.setItem('isLoggedIn', 'false');
      // history.push('/login');
    }
    toast.error(err.data.error || 'Unknown error');
  }
};
