import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAppSelector } from '../../app/hooks';

import {
  useForcelogoutMutation,
  useGetAccountQuery,
} from './User.api';
import { userSelector } from './User.slice';

const Account = () => {
  const [forcelogout] = useForcelogoutMutation();

  useGetAccountQuery();

  return (
    <>
      <div style={{ marginTop: '10em' }}>
        <h2>Account details</h2>
      </div>

      <button
        className="SmallButton"
        type="button"
        onClick={() => { forcelogout(); }}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      >
        Force logout this user
      </button>

      <Link className="AppLink" to="/">Home</Link>

    </>
  );
};

export default Account;
