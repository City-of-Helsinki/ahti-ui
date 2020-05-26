import gql from 'graphql-tag';

const CREATE_FEATURE_MUTATION = gql`
  mutation createFeature($input: CreateFeatureMutationInput!) {
    createFeature(input: $input) {
      clientMutationId
    }
  }
`;
