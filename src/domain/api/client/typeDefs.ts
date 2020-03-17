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

  type Harbor implements FeatureInterface {
    id: ID!
    type: String
    geometry: GeometryObjectType!
    bbox: GenericScalar
    properties: GenericFeatureProperties!
    pricing: HarborPricing!
    mooringTypes: [MooringType!]!
    mooringInformation: String!
    depth: HarborDepth!
    bookingUrl: String
  }

  type HarborPricing {
    hour: Int
    day: Int
    overnight: Int
    week: Int
  }

  type HarborDepth {
    minDepth: Int!
    maxDepth: Int!
  }

  enum MooringType {
    BUOY
    POLE
    PIER
  }

  extend type FeatureProperties {
    shortDescription: String!
    harbors: [Harbor!]!
    ferries: [Ferry!]!
  }

  extend type Query {
    ferry(ahtiId: String!): Ferry
    harbor(ahtiId: String!): Harbor
  }
`;

export default typeDefs;
