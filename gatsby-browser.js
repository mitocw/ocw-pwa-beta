/* eslint-disable import/prefer-default-export */
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { FaunaProvider } from './src/faunadb/client';
import client from './src/apollo/client';
import Store from './src/store/store';
import { SessionCheck } from './src/scripts/auth';

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <FaunaProvider>
      <Store.Provider>
        <SessionCheck>
          {element}
        </SessionCheck>
      </Store.Provider>
    </FaunaProvider>
  </ApolloProvider>
);
