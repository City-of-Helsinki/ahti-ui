import ApolloClient, { InMemoryCache } from 'apollo-boost';

import i18n from '../../common/translation/i18n/i18n';
import typeDefs from './client/typeDefs';
import resolvers from './client/resolvers';

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_AHTI_GRAPHQL_API_URI,
  request: operation => {
    operation.setContext({
      headers: {
        'accept-language':
          i18n.language || window.localStorage.i18nextLng || 'fi'
      }
    });
  },
  typeDefs,
  resolvers
});
