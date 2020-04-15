/* eslint-disable @typescript-eslint/no-explicit-any */
import ferryData from './staticData/ferries.json';
import { FeatureProperties } from '../generated/types.d';

const resolvers = {
  Query: {
    ferry: (_: any, args: { ahtiId: string }) => {
      return ferryData.find((ferry) => ferry.properties.ahtiId === args.ahtiId);
    },
  },
  FeatureProperties: {
    shortDescription: (featureProperties: FeatureProperties) => {
      const description = featureProperties.description;
      return description && description.indexOf('.') !== -1
        ? description.substr(0, description.indexOf('.') + 2)
        : '';
    },
    ferries: (island: { ahtiId: string }) => {
      return ferryData
        .filter((ferry) => ferry.toIsland === island.ahtiId)
        .map((ferry) => {
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

export default resolvers;
