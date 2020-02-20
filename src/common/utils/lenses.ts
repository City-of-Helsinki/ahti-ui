import { Feature, FeaturesQuery } from '../../domain/api/generated/types.d';

export interface Lens<A, B> {
  get: (a: A) => B;
  set: (a: A, b: B) => A;
}

export const featuresLens: Lens<FeaturesQuery, Feature[]> = {
  get: data => {
    if (!data.features) {
      return [];
    }
    const features: Feature[] = data.features.edges.reduce(
      (acc: Array<any>, curr: any) => {
        if (curr && curr.node) {
          return [...acc, curr.node];
        }
        return acc;
      },
      []
    );
    return features;
  },
  set: () => {
    throw Error('Setting not supported');
  }
};
