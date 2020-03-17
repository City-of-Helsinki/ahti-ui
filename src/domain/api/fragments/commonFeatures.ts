import { gql } from 'apollo-boost';

const commonFeatures = gql`
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
`;

export default commonFeatures;
