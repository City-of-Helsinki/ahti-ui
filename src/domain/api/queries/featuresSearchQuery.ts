import { gql } from 'apollo-boost';

const FEATURES_SEARCH_QUERY = gql`
  query featuresSearch {
    features {
      edges {
        node {
          properties {
            ahtiId
            category {
              id
            }
            name
            contactInfo {
              address {
                municipality
              }
            }
          }
        }
      }
    }
  }
`;

export default FEATURES_SEARCH_QUERY;
