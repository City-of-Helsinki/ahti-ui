import gql from 'graphql-tag';

const TAGS_AND_CATEGORIES_QUERY = gql`
  query tagsAndCategories {
    featureCategories {
      id
      name
    }
    tags {
      id
      name
    }
  }
`;

export default TAGS_AND_CATEGORIES_QUERY;
