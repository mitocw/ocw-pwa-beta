import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  uri: 'https://fakeql.com/graphql/28840c72a6be685665c9ca6be94786a4',
  fetch,
});

export default client;
