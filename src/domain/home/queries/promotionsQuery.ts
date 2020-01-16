import { gql } from 'apollo-boost';

const PROMOTIONS_QUERY = gql`
  query PROMOTIONS {
    features {
      edges {
        node {
          properties {
            name
            images {
              url
            }
          }
        }
      }
    }
  }
`;

export default PROMOTIONS_QUERY;
