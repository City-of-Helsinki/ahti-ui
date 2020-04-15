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
        cursor
        node {
          id
          type
          geometry {
            type
            coordinates
          }
          properties {
            ahtiId
            details {
              harbor {
                moorings
                depth {
                  min
                  max
                }
              }
            }
            children {
              properties {
                ahtiId
                name
                category {
                  id
                }
              }
            }
            parents {
              properties {
                ahtiId
                name
                category {
                  id
                }
              }
            }
            category {
              id
            }
            links {
              type
              url
            }
            name
            tags {
              id
              name
            }
            description
            shortDescription @client
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
          }
        }
      }
    }
  }
`;

export default FEATURES_QUERY;
