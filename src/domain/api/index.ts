import ApolloClient, { InMemoryCache } from 'apollo-boost';

import typeDefs from './client/typeDefs';
import resolvers from './client/resolvers';

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_AHTI_GRAPHQL_API_URI,
  typeDefs,
  resolvers
});
