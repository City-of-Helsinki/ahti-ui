import gql from 'graphql-tag';

const TAGS_QUERY = gql`
  query tags {
    tags {
      id
      name
    }
  }
`;

export default TAGS_QUERY;
