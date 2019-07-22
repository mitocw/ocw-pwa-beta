import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';
import { readOnlyAccessToken } from '../../.datocms';

/*
  Load the DatoCMS config from ./.datocms.json
  It must have the following structure:
  {
    "fullAccessToken": full-access-token,
    "readOnlyAccessToken": read-only-access-token,
  }
  1. Content Delivery API -> GraphQL Endpoint: https://graphql.datocms.com
  2. Content Delivery API with draft content -> GraphQL Endpoint: https://graphql.datocms.com/preview
*/
const httpLink = createHttpLink({
  uri: 'https://graphql.datocms.com',
});

const authLink = setContext((_, { headers }) => (
  {
    headers: {
      ...headers,
      authorization: readOnlyAccessToken ? `Bearer ${readOnlyAccessToken}` : '',
    },
  }
));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetch,
});

export default client;
