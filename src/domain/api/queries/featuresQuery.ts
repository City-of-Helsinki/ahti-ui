import { gql } from 'apollo-boost';

const FEATURES_QUERY = gql`
  query features {
    features {
      edges {
        node {
          id
          type
          geometry {
            type
            coordinates
          }
          properties {
            ahtiId
            category {
              id
            }
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
            ferries @client {
              properties {
                ahtiId
                name
              }
            }
            harbors @client {
              properties {
                ahtiId
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default FEATURES_QUERY;
