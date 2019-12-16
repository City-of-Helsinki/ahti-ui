import { gql } from 'apollo-boost';

const FEATURES_QUERY = gql`
  query FEATURES {
    features {
      edges {
        node {
          id
          type
          geometry {
            coordinates
          }
          properties {
            type
            name
            header
            description
            website
            address
            imageId
          }
        }
      }
    }
  }
`;

export default FEATURES_QUERY;
