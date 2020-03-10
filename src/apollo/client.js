import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

/*
  1. Content Delivery API -> GraphQL Endpoint: https://graphql.datocms.com
  2. Content Delivery API with draft content -> GraphQL Endpoint: https://graphql.datocms.com/preview
*/
const httpLink = createHttpLink({
  uri: 'https://graphql.datocms.com/preview',
});

const authLink = setContext((_, { headers }) => (
  {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.GATSBY_DATOCMS_READ_ONLY_ACCESS_TOKEN}`,
    },
  }
));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetch,
});

export default client;
