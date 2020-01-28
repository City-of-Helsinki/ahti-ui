import { gql } from 'apollo-boost';

export const GlobalFragments = {
  commonFeatures: gql`
    fragment CommonFeatures on FeatureInterface {
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
            streetAddress
            postalCode
            municipality
          }
        }
      }
    }
  `,
};
