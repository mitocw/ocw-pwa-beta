import React from 'react';
import AuthLoading from '../components/auth-loading';
import { login, isAuthenticated } from '../scripts/auth';

const Redirect = () => {
  if (!isAuthenticated()) {
    login();
  }
  return <AuthLoading />;
};

export default Redirect;
