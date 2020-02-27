/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from 'faker';

import ferryData from './staticData/ferries.json';
import harborData from './staticData/harbors.json';

const resolvers = {
  Query: {
    ferry: (_: any, args: { ahtiId: string }) => {
      return ferryData.find(ferry => ferry.properties.ahtiId === args.ahtiId);
    },
    harbor: (_: any, args: { ahtiId: string }) => {
      return harborData.find(
        harbor => harbor.properties.ahtiId === args.ahtiId
      );
    }
  },
  FeatureProperties: {
    shortDescription: () => {
      return faker.lorem.lines(1);
    },
    harbors: (island: { ahtiId: string }) => {
      return harborData
        .filter(harbor => harbor.onIsland === island.ahtiId)
        .map(harbor => {
          return {
            __typename: 'Harbor',
            properties: {
              __typename: 'GenericFeatureProperties',
              ahtiId: harbor.properties.ahtiId,
              name: harbor.properties.name
            }
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
              name: ferry.properties.name
            }
          };
        });
    }
  }
};

export default resolvers;
