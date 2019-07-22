/* eslint-disable import/prefer-default-export */
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './client';
import Store from '../store/store';

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Store.Provider>{element}</Store.Provider>
  </ApolloProvider>
);
