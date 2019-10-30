import React, { createContext } from 'react';
import faunadb from 'faunadb';

const client = new faunadb.Client({
  secret: process.env.GATSBY_FAUNADB_SECRET,
});

export const FaunaContext = createContext(null);

export const FaunaProvider = ({ children }) => (
  <FaunaContext.Provider value={client}>
    {children}
  </FaunaContext.Provider>
);
