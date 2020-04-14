import { gql } from 'apollo-boost';

const CATEGORIES_QUERY = gql`
  query categories {
    featureCategories {
      id
      name
    }
  }
`;

export default CATEGORIES_QUERY;
