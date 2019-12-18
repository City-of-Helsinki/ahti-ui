import { gql } from 'apollo-boost';

const PROMOTIONS_QUERY = gql`
  query PROMOTIONS {
    features {
      edges {
        node {
          properties {
            name
            header
            imageId
          }
        }
      }
    }
  }
`;

export default PROMOTIONS_QUERY;
