import { gql } from 'apollo-boost';

const ISLAND_QUERY = gql`
  query island($ahtiId: String!) {
    island(ahtiId: $ahtiId) @client {
      geometry {
        type
        coordinates
      }
      properties {
        images {
          url
          copyrightOwner
        }
        tags {
          name
        }
        source {
          system
        }
        name
        description
        modifiedAt
        url
        contactInfo {
          phoneNumber
          address {
            postalCode
            municipality
          }
        }
        harbors @client {
          properties {
            ahtiId
            name
          }
        }
        ferries @client {
          properties {
            ahtiId
            name
          }
        }
      }
    }
  }
`;

export default ISLAND_QUERY;
