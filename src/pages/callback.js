import React from 'react';
import AuthLoading from '../components/auth-loading';
import { handleAuthentication } from '../scripts/auth';

const Callback = () => {
  handleAuthentication();
  return <AuthLoading />;
};

export default Callback;
