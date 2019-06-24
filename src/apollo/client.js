import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

const token = 'b761391a64b706a9fb2329b9f662cf';

const httpLink = createHttpLink({
  uri: 'https://graphql.datocms.com/preview',
});

const authLink = setContext((_, { headers }) => (
  {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetch,
});

export default client;
