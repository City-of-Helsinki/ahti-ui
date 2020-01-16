import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';

const typeDefs = gql`
  extend type FeatureProperties {
    type: String!
  }
`;

const resolvers = {
  FeatureProperties: {
    type: () => 'myhelsinki',
  },
};

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_AHTI_GRAPHQL_API_URI,
  typeDefs,
  resolvers,
});
