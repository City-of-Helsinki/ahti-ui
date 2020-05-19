import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { toast } from 'react-toastify';

import i18n from '../../common/translation/i18n/i18n';
import typeDefs from './client/typeDefs';
import resolvers from './client/resolvers';

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_AHTI_GRAPHQL_API_URI,
  request: (operation) => {
    operation.setContext({
      headers: {
        'accept-language':
          i18n.language || window.localStorage.i18nextLng || 'fi',
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      toast.error(i18n.t('common.network_error'), {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  },
  typeDefs,
  resolvers,
});
