import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  uri: process.env.REACT_APP_AHTI_GRAPHQL_API_URI,
});
