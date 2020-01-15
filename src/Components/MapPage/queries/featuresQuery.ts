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
            tags {
              name
            }
            header
            description
            url
            contactInfo {
              phoneNumber
              address {
                postalCode
                municipality
              }
            }
            imageId
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
