/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './src/apollo/client';
import Store from './src/store/store';
import { checkSession } from './src/scripts/auth';

const SessionCheck = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(
    () => checkSession(() => setLoading(false)),
  );
  return loading === false && <>{children}</>;
};

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Store.Provider>
      <SessionCheck>
        {element}
      </SessionCheck>
    </Store.Provider>
  </ApolloProvider>
);
