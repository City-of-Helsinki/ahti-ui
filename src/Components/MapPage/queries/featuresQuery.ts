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
            type @client
            name
            tags {
              name
            }
            description
            url
            contactInfo {
              phoneNumber
              address {
                postalCode
                municipality
              }
            }
            images {
              url
              copyrightOwner
            }
            source {
              system
            }
            modifiedAt
          }
        }
      }
    }
  }
`;

export default FEATURES_QUERY;
