import { gql } from 'apollo-boost';

const TAGS_QUERY = gql`
  query tags {
    tags {
      id
      name
    }
  }
`;

export default TAGS_QUERY;
