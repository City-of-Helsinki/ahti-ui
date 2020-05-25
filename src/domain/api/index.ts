import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { toast } from 'react-toastify';

import i18n from '../../common/translation/i18n/i18n';
import typeDefs from './client/typeDefs';
import resolvers from './client/resolvers';

let networkErrorToastId: any = null;

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_AHTI_GRAPHQL_API_URI,
});

const acceptLanguageLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'accept-language':
        i18n.language || window.localStorage.i18nextLng || 'fi',
    },
  });
  return forward(operation);
});

const errorLink = onError(({ networkError, operation, forward }) => {
  if (networkError) {
    if (!networkErrorToastId) {
      networkErrorToastId = toast.error(i18n.t('common.network_error'), {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        onClose: () => (networkErrorToastId = null),
      });
    }
  }
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 1000,
    jitter: true,
  },
  attempts: {
    max: Infinity,
  },
});

const link = ApolloLink.from([
  retryLink,
  errorLink,
  acceptLanguageLink,
  httpLink,
]);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
  typeDefs,
  resolvers,
});
