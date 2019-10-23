import React from 'react';
import { handleAuthentication } from '../scripts/auth';

const Callback = () => {
  handleAuthentication();

  return <p>Loading...</p>;
};

export default Callback;
