import {
  CategoriesQuery,
  Feature,
  FeatureCategory,
  FeaturesQuery,
  Tag,
  TagsQuery,
} from '../../domain/api/generated/types.d';
import { categories } from '../../domain/constants';

export interface Lens<A, B> {
  get: (a: A) => B;
  set: (a: A, b: B) => A;
}

export const featuresLens: Lens<FeaturesQuery, Feature[]> = {
  get: (data) => {
    if (!data.features) {
      return [];
    }
    const features: Feature[] = data.features.edges.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  },
};

export const ferriesLens: Lens<Feature, Feature[]> = {
  get: (feature) => {
    return feature.properties.children.filter(
      (child) => child.properties.category.id === categories.FERRY
    );
  },
  set: () => {
    throw Error('Setting not supported');
  },
};

export const harborsLens: Lens<Feature, Feature[]> = {
  get: (feature) => {
    return feature.properties.children.filter(
      (child) => child.properties.category.id === categories.HARBOR
    );
  },
  set: () => {
    throw Error('Setting not supported');
  },
};

export const tagsLens: Lens<TagsQuery, Tag[]> = {
  get: (data) => {
    if (!data || !data.tags) {
      return [];
    }
    return data.tags as Tag[];
  },
  set: () => {
    throw Error('Setting not supported');
  },
};

export const categoriesLens: Lens<CategoriesQuery, FeatureCategory[]> = {
  get: (data) => {
    if (!data || !data.featureCategories) {
      return [];
    }
    return data.featureCategories as FeatureCategory[];
  },
  set: () => {
    throw Error('Setting not supported');
  },
};
