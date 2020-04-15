import { gql } from 'apollo-boost';

const typeDefs = gql`
  interface FeatureInterface {
    id: ID!
    type: String
    geometry: GeometryObjectType!
    bbox: GenericScalar
    properties: GenericFeatureProperties!
  }

  interface HasContactInfo {
    url: String!
    contactInfo: ContactInfo!
  }

  type GenericFeatureProperties implements HasContactInfo {
    createdAt: DateTime!
    tags: [Tag!]!
    ahtiId: String!
    source: FeatureSource!
    name: String!
    description: String
    modifiedAt: DateTime!
    url: String!
    contactInfo: ContactInfo!
    images: [Image!]!
  }

  type Ferry implements FeatureInterface {
    id: ID!
    type: String
    geometry: GeometryObjectType!
    bbox: GenericScalar
    properties: GenericFeatureProperties!
    duration: Int!
    pricing: FerryPricing
    portAddress: Address
    bookingUrl: String
  }

  type FerryPricing {
    adult: Int!
    child: Int!
  }

  extend type FeatureProperties {
    shortDescription: String!
    ferries: [Ferry!]!
  }

  extend type Query {
    ferry(ahtiId: String!): Ferry
  }
`;

export default typeDefs;
