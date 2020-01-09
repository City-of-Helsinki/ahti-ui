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
            url
            address
            imageId
            images {
              url
              copyrightOwner
            }
            source {
              system
            }
          }
        }
      }
    }
  }
`;

export default FEATURES_QUERY;
