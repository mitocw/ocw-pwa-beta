import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';
import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

/*
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
      authorization: `Bearer ${process.env.GATSBY_DATOCMS_READ_ONLY_ACCESS_TOKEN}`,
    },
  }
));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ fragmentMatcher }),
  fetch,
});

export default client;
