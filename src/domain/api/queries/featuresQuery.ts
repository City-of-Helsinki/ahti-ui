import { gql } from 'apollo-boost';

const FEATURES_QUERY = gql`
  query features(
    $after: String
    $first: Int
    $category: [String]
    $tag: [String]
  ) {
    features(
      after: $after
      first: $first
      category: $category
      taggedWithAny: $tag
    ) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        node {
          geometry {
            type
            coordinates
          }
          properties {
            ahtiId
            category {
              id
            }
            contactInfo {
              address {
                municipality
              }
            }
            name
            description
            shortDescription @client
            url
            images {
              url
              copyrightOwner
            }
          }
        }
      }
    }
  }
`;

export default FEATURES_QUERY;
