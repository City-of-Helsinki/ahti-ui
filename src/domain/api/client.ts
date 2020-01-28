import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
import ferryData from './staticData/ferries.json';
import harborData from './staticData/harbors.json';
import FEATURES_QUERY from '../../Components/MapPage/queries/featuresQuery';

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
    startingPort: Address
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
    type: String!
    harbors: [Harbor!]!
    ferries: [Ferry!]!
  }

  extend type Query {
    island(ahtiId: String!): Feature
    ferry(ahtiId: String!): Ferry
    harbor(ahtiId: String!): Harbor
  }
`;

const resolvers = {
  Query: {
    island: (_: any, args: { ahtiId: string }, { cache }: { cache: any }) => {
      return cache
        .readQuery({ query: FEATURES_QUERY })
        .features.edges.map((edge: any) => edge.node)
        .find((island: any) => island.properties.ahtiId === args.ahtiId);
    },
    ferry: (_: any, args: { ahtiId: string }) => {
      return ferryData.find(ferry => ferry.properties.ahtiId === args.ahtiId);
    },
    harbor: (_: any, args: { ahtiId: string }) => {
      return harborData.find(
        harbor => harbor.properties.ahtiId === args.ahtiId
      );
    },
  },
  FeatureProperties: {
    type: (): string => 'myhelsinki',
    harbors: (island: { ahtiId: string }) => {
      return harborData
        .filter(harbor => harbor.onIsland === island.ahtiId)
        .map(harbor => {
          return {
            __typename: 'Harbor',
            properties: {
              __typename: 'GenericFeatureProperties',
              ahtiId: harbor.properties.ahtiId,
              name: harbor.properties.name,
            },
          };
        });
    },
    ferries: (island: { ahtiId: string }) => {
      return ferryData
        .filter(ferry => ferry.toIsland === island.ahtiId)
        .map(ferry => {
          return {
            __typename: 'Ferry',
            properties: {
              __typename: 'GenericFeatureProperties',
              ahtiId: ferry.properties.ahtiId,
              name: ferry.properties.name,
            },
          };
        });
    },
  },
};

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_AHTI_GRAPHQL_API_URI,
  typeDefs,
  resolvers,
});
