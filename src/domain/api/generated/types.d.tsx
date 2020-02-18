/* eslint-disable */
import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  GenericScalar: any;
  DateTime: Date;
  Date: any;
  Time: any;
};

export type Address = {
  __typename?: 'Address';
  streetAddress?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  municipality?: Maybe<Scalars['String']>;
};

export type ContactInfo = {
  __typename?: 'ContactInfo';
  phoneNumber: Scalars['String'];
  email: Scalars['String'];
  address?: Maybe<Address>;
};

export type Feature = Node & {
  __typename?: 'Feature';
  type?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  geometry: GeometryObjectType;
  bbox?: Maybe<Scalars['GenericScalar']>;
  properties?: Maybe<FeatureProperties>;
};

export type FeatureCategory = {
  __typename?: 'FeatureCategory';
  id: Scalars['String'];
  features: FeatureConnection;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type FeatureCategoryFeaturesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type FeatureConnection = {
  __typename?: 'FeatureConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<FeatureEdge>>;
};

export type FeatureEdge = {
  __typename?: 'FeatureEdge';
  node?: Maybe<Feature>;
  cursor: Scalars['String'];
};

export type FeatureInterface = {
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  geometry: GeometryObjectType;
  bbox?: Maybe<Scalars['GenericScalar']>;
  properties: GenericFeatureProperties;
};

export type FeatureProperties = {
  __typename?: 'FeatureProperties';
  ahtiId: Scalars['String'];
  category?: Maybe<FeatureCategory>;
  children: Array<Maybe<Feature>>;
  contactInfo?: Maybe<ContactInfo>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  ferries: Array<Ferry>;
  harbors: Array<Harbor>;
  images: Array<Image>;
  modifiedAt: Scalars['DateTime'];
  name: Scalars['String'];
  openingHoursPeriods: Array<OpeningHoursPeriod>;
  parents: Array<Maybe<Feature>>;
  source: FeatureSource;
  tags: Array<Tag>;
  translations: Array<FeatureTranslations>;
  type: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type FeatureSource = {
  __typename?: 'FeatureSource';
  system: Scalars['String'];
  type: Scalars['String'];
  id: Scalars['String'];
};

export enum FeatureTranslationLanguageCode {
  Fi = 'FI',
  En = 'EN',
  Sv = 'SV'
}

export type FeatureTranslations = {
  __typename?: 'FeatureTranslations';
  languageCode: FeatureTranslationLanguageCode;
  name: Scalars['String'];
  url: Scalars['String'];
  description: Scalars['String'];
};

export type Ferry = FeatureInterface & {
  __typename?: 'Ferry';
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  geometry: GeometryObjectType;
  bbox?: Maybe<Scalars['GenericScalar']>;
  properties: GenericFeatureProperties;
  duration: Scalars['Int'];
  pricing?: Maybe<FerryPricing>;
  portAddress?: Maybe<Address>;
  bookingUrl?: Maybe<Scalars['String']>;
};

export type FerryPricing = {
  __typename?: 'FerryPricing';
  adult: Scalars['Int'];
  child: Scalars['Int'];
};

export type GenericFeatureProperties = HasContactInfo & {
  __typename?: 'GenericFeatureProperties';
  createdAt: Scalars['DateTime'];
  tags: Array<Tag>;
  ahtiId: Scalars['String'];
  source: FeatureSource;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  modifiedAt: Scalars['DateTime'];
  url: Scalars['String'];
  contactInfo: ContactInfo;
  images: Array<Image>;
};

export type GeometryObjectType = {
  __typename?: 'GeometryObjectType';
  type?: Maybe<Scalars['String']>;
  coordinates?: Maybe<Scalars['GenericScalar']>;
};

export type Harbor = FeatureInterface & {
  __typename?: 'Harbor';
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  geometry: GeometryObjectType;
  bbox?: Maybe<Scalars['GenericScalar']>;
  properties: GenericFeatureProperties;
  pricing: HarborPricing;
  mooringTypes: Array<MooringType>;
  mooringInformation: Scalars['String'];
  depth: HarborDepth;
  bookingUrl?: Maybe<Scalars['String']>;
};

export type HarborDepth = {
  __typename?: 'HarborDepth';
  minDepth: Scalars['Int'];
  maxDepth: Scalars['Int'];
};

export type HarborPricing = {
  __typename?: 'HarborPricing';
  hour?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  overnight?: Maybe<Scalars['Int']>;
  week?: Maybe<Scalars['Int']>;
};

export type HasContactInfo = {
  url: Scalars['String'];
  contactInfo: ContactInfo;
};

export type Image = {
  __typename?: 'Image';
  url: Scalars['String'];
  copyrightOwner: Scalars['String'];
  license: License;
};

export type License = {
  __typename?: 'License';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum MooringType {
  Buoy = 'BUOY',
  Pole = 'POLE',
  Pier = 'PIER'
}

export type Node = {
  id: Scalars['ID'];
};

export type OpeningHours = {
  __typename?: 'OpeningHours';
  opens?: Maybe<Scalars['Time']>;
  closes?: Maybe<Scalars['Time']>;
  allDay: Scalars['Boolean'];
  day: Weekday;
};

export type OpeningHoursPeriod = {
  __typename?: 'OpeningHoursPeriod';
  validFrom?: Maybe<Scalars['Date']>;
  validTo?: Maybe<Scalars['Date']>;
  openingHours: Array<OpeningHours>;
  comment?: Maybe<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  featureCategories?: Maybe<Array<Maybe<FeatureCategory>>>;
  features?: Maybe<FeatureConnection>;
  ferry?: Maybe<Ferry>;
  harbor?: Maybe<Harbor>;
  island?: Maybe<Feature>;
};

export type QueryFeaturesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryFerryArgs = {
  ahtiId: Scalars['String'];
};

export type QueryHarborArgs = {
  ahtiId: Scalars['String'];
};

export type QueryIslandArgs = {
  ahtiId: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum Weekday {
  Monday = 'MONDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
  Thursday = 'THURSDAY',
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY'
}

type CommonFeatures_Ferry_Fragment = { __typename?: 'Ferry' } & {
  geometry: { __typename?: 'GeometryObjectType' } & Pick<
    GeometryObjectType,
    'type' | 'coordinates'
  >;
  properties: { __typename?: 'GenericFeatureProperties' } & Pick<
    GenericFeatureProperties,
    'name' | 'description' | 'modifiedAt' | 'url'
  > & {
      images: Array<
        { __typename?: 'Image' } & Pick<Image, 'url' | 'copyrightOwner'>
      >;
      tags: Array<{ __typename?: 'Tag' } & Pick<Tag, 'name'>>;
      source: { __typename?: 'FeatureSource' } & Pick<FeatureSource, 'system'>;
      contactInfo: { __typename?: 'ContactInfo' } & Pick<
        ContactInfo,
        'phoneNumber'
      > & {
          address: Maybe<
            { __typename?: 'Address' } & Pick<
              Address,
              'streetAddress' | 'postalCode' | 'municipality'
            >
          >;
        };
    };
};

type CommonFeatures_Harbor_Fragment = { __typename?: 'Harbor' } & {
  geometry: { __typename?: 'GeometryObjectType' } & Pick<
    GeometryObjectType,
    'type' | 'coordinates'
  >;
  properties: { __typename?: 'GenericFeatureProperties' } & Pick<
    GenericFeatureProperties,
    'name' | 'description' | 'modifiedAt' | 'url'
  > & {
      images: Array<
        { __typename?: 'Image' } & Pick<Image, 'url' | 'copyrightOwner'>
      >;
      tags: Array<{ __typename?: 'Tag' } & Pick<Tag, 'name'>>;
      source: { __typename?: 'FeatureSource' } & Pick<FeatureSource, 'system'>;
      contactInfo: { __typename?: 'ContactInfo' } & Pick<
        ContactInfo,
        'phoneNumber'
      > & {
          address: Maybe<
            { __typename?: 'Address' } & Pick<
              Address,
              'streetAddress' | 'postalCode' | 'municipality'
            >
          >;
        };
    };
};

export type CommonFeaturesFragment =
  | CommonFeatures_Ferry_Fragment
  | CommonFeatures_Harbor_Fragment;

export type FeaturesQueryVariables = {};

export type FeaturesQuery = { __typename?: 'Query' } & {
  features: Maybe<
    { __typename?: 'FeatureConnection' } & {
      edges: Array<
        Maybe<
          { __typename?: 'FeatureEdge' } & {
            node: Maybe<
              { __typename?: 'Feature' } & Pick<Feature, 'id' | 'type'> & {
                  geometry: { __typename?: 'GeometryObjectType' } & Pick<
                    GeometryObjectType,
                    'type' | 'coordinates'
                  >;
                  properties: Maybe<
                    { __typename?: 'FeatureProperties' } & Pick<
                      FeatureProperties,
                      'ahtiId' | 'name' | 'description' | 'url' | 'modifiedAt'
                    > & {
                        category: Maybe<
                          { __typename?: 'FeatureCategory' } & Pick<
                            FeatureCategory,
                            'id'
                          >
                        >;
                        tags: Array<{ __typename?: 'Tag' } & Pick<Tag, 'name'>>;
                        contactInfo: Maybe<
                          { __typename?: 'ContactInfo' } & Pick<
                            ContactInfo,
                            'phoneNumber'
                          > & {
                              address: Maybe<
                                { __typename?: 'Address' } & Pick<
                                  Address,
                                  'postalCode' | 'municipality'
                                >
                              >;
                            }
                        >;
                        images: Array<
                          { __typename?: 'Image' } & Pick<
                            Image,
                            'url' | 'copyrightOwner'
                          >
                        >;
                        source: { __typename?: 'FeatureSource' } & Pick<
                          FeatureSource,
                          'system'
                        >;
                        ferries: Array<
                          { __typename?: 'Ferry' } & {
                            properties: {
                              __typename?: 'GenericFeatureProperties';
                            } & Pick<
                              GenericFeatureProperties,
                              'ahtiId' | 'name'
                            >;
                          }
                        >;
                        harbors: Array<
                          { __typename?: 'Harbor' } & {
                            properties: {
                              __typename?: 'GenericFeatureProperties';
                            } & Pick<
                              GenericFeatureProperties,
                              'ahtiId' | 'name'
                            >;
                          }
                        >;
                      }
                  >;
                }
            >;
          }
        >
      >;
    }
  >;
};

export type FeaturesSearchQueryVariables = {};

export type FeaturesSearchQuery = { __typename?: 'Query' } & {
  features: Maybe<
    { __typename?: 'FeatureConnection' } & {
      edges: Array<
        Maybe<
          { __typename?: 'FeatureEdge' } & {
            node: Maybe<
              { __typename?: 'Feature' } & {
                properties: Maybe<
                  { __typename?: 'FeatureProperties' } & Pick<
                    FeatureProperties,
                    'ahtiId' | 'name'
                  > & {
                      category: Maybe<
                        { __typename?: 'FeatureCategory' } & Pick<
                          FeatureCategory,
                          'id'
                        >
                      >;
                      contactInfo: Maybe<
                        { __typename?: 'ContactInfo' } & {
                          address: Maybe<
                            { __typename?: 'Address' } & Pick<
                              Address,
                              'municipality'
                            >
                          >;
                        }
                      >;
                    }
                >;
              }
            >;
          }
        >
      >;
    }
  >;
};

export type FerryQueryVariables = {
  ahtiId: Scalars['String'];
};

export type FerryQuery = { __typename?: 'Query' } & {
  ferry: Maybe<
    { __typename?: 'Ferry' } & Pick<Ferry, 'duration' | 'bookingUrl'> & {
        pricing: Maybe<
          { __typename?: 'FerryPricing' } & Pick<
            FerryPricing,
            'adult' | 'child'
          >
        >;
        portAddress: Maybe<
          { __typename?: 'Address' } & Pick<
            Address,
            'streetAddress' | 'municipality'
          >
        >;
      } & CommonFeatures_Ferry_Fragment
  >;
};

export type HarborQueryVariables = {
  ahtiId: Scalars['String'];
};

export type HarborQuery = { __typename?: 'Query' } & {
  harbor: Maybe<
    { __typename?: 'Harbor' } & Pick<
      Harbor,
      'mooringTypes' | 'mooringInformation' | 'bookingUrl'
    > & {
        pricing: { __typename?: 'HarborPricing' } & Pick<
          HarborPricing,
          'hour' | 'day' | 'overnight' | 'week'
        >;
        depth: { __typename?: 'HarborDepth' } & Pick<
          HarborDepth,
          'minDepth' | 'maxDepth'
        >;
      } & CommonFeatures_Harbor_Fragment
  >;
};

export type IslandQueryVariables = {
  ahtiId: Scalars['String'];
};

export type IslandQuery = { __typename?: 'Query' } & {
  island: Maybe<
    { __typename?: 'Feature' } & {
      geometry: { __typename?: 'GeometryObjectType' } & Pick<
        GeometryObjectType,
        'type' | 'coordinates'
      >;
      properties: Maybe<
        { __typename?: 'FeatureProperties' } & Pick<
          FeatureProperties,
          'name' | 'description' | 'modifiedAt' | 'url'
        > & {
            images: Array<
              { __typename?: 'Image' } & Pick<Image, 'url' | 'copyrightOwner'>
            >;
            tags: Array<{ __typename?: 'Tag' } & Pick<Tag, 'name'>>;
            source: { __typename?: 'FeatureSource' } & Pick<
              FeatureSource,
              'system'
            >;
            contactInfo: Maybe<
              { __typename?: 'ContactInfo' } & Pick<
                ContactInfo,
                'phoneNumber'
              > & {
                  address: Maybe<
                    { __typename?: 'Address' } & Pick<
                      Address,
                      'postalCode' | 'municipality'
                    >
                  >;
                }
            >;
            harbors: Array<
              { __typename?: 'Harbor' } & {
                properties: { __typename?: 'GenericFeatureProperties' } & Pick<
                  GenericFeatureProperties,
                  'ahtiId' | 'name'
                >;
              }
            >;
            ferries: Array<
              { __typename?: 'Ferry' } & {
                properties: { __typename?: 'GenericFeatureProperties' } & Pick<
                  GenericFeatureProperties,
                  'ahtiId' | 'name'
                >;
              }
            >;
          }
      >;
    }
  >;
};

export const CommonFeaturesFragmentDoc = gql`
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
export const FeaturesDocument = gql`
  query features {
    features {
      edges {
        node {
          id
          type
          geometry {
            type
            coordinates
          }
          properties {
            ahtiId
            category {
              id
            }
            name
            tags {
              name
            }
            description
            url
            contactInfo {
              phoneNumber
              address {
                postalCode
                municipality
              }
            }
            images {
              url
              copyrightOwner
            }
            source {
              system
            }
            modifiedAt
            ferries @client {
              properties {
                ahtiId
                name
              }
            }
            harbors @client {
              properties {
                ahtiId
                name
              }
            }
          }
        }
      }
    }
  }
`;
export type FeaturesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FeaturesQuery,
    FeaturesQueryVariables
  >,
  'query'
>;

export const FeaturesComponent = (props: FeaturesComponentProps) => (
  <ApolloReactComponents.Query<FeaturesQuery, FeaturesQueryVariables>
    query={FeaturesDocument}
    {...props}
  />
);

/**
 * __useFeaturesQuery__
 *
 * To run a query within a React component, call `useFeaturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeaturesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FeaturesQuery,
    FeaturesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<FeaturesQuery, FeaturesQueryVariables>(
    FeaturesDocument,
    baseOptions
  );
}
export function useFeaturesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FeaturesQuery,
    FeaturesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<FeaturesQuery, FeaturesQueryVariables>(
    FeaturesDocument,
    baseOptions
  );
}
export type FeaturesQueryHookResult = ReturnType<typeof useFeaturesQuery>;
export type FeaturesLazyQueryHookResult = ReturnType<
  typeof useFeaturesLazyQuery
>;
export type FeaturesQueryResult = ApolloReactCommon.QueryResult<
  FeaturesQuery,
  FeaturesQueryVariables
>;
export const FeaturesSearchDocument = gql`
  query featuresSearch {
    features {
      edges {
        node {
          properties {
            ahtiId
            category {
              id
            }
            name
            contactInfo {
              address {
                municipality
              }
            }
          }
        }
      }
    }
  }
`;
export type FeaturesSearchComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FeaturesSearchQuery,
    FeaturesSearchQueryVariables
  >,
  'query'
>;

export const FeaturesSearchComponent = (
  props: FeaturesSearchComponentProps
) => (
  <ApolloReactComponents.Query<
    FeaturesSearchQuery,
    FeaturesSearchQueryVariables
  >
    query={FeaturesSearchDocument}
    {...props}
  />
);

/**
 * __useFeaturesSearchQuery__
 *
 * To run a query within a React component, call `useFeaturesSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturesSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturesSearchQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeaturesSearchQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FeaturesSearchQuery,
    FeaturesSearchQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FeaturesSearchQuery,
    FeaturesSearchQueryVariables
  >(FeaturesSearchDocument, baseOptions);
}
export function useFeaturesSearchLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FeaturesSearchQuery,
    FeaturesSearchQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FeaturesSearchQuery,
    FeaturesSearchQueryVariables
  >(FeaturesSearchDocument, baseOptions);
}
export type FeaturesSearchQueryHookResult = ReturnType<
  typeof useFeaturesSearchQuery
>;
export type FeaturesSearchLazyQueryHookResult = ReturnType<
  typeof useFeaturesSearchLazyQuery
>;
export type FeaturesSearchQueryResult = ApolloReactCommon.QueryResult<
  FeaturesSearchQuery,
  FeaturesSearchQueryVariables
>;
export const FerryDocument = gql`
  query ferry($ahtiId: String!) {
    ferry(ahtiId: $ahtiId) @client {
      ...CommonFeatures
      duration
      pricing {
        adult
        child
      }
      portAddress {
        streetAddress
        municipality
      }
      bookingUrl
    }
  }
  ${CommonFeaturesFragmentDoc}
`;
export type FerryComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<FerryQuery, FerryQueryVariables>,
  'query'
> &
  ({ variables: FerryQueryVariables; skip?: boolean } | { skip: boolean });

export const FerryComponent = (props: FerryComponentProps) => (
  <ApolloReactComponents.Query<FerryQuery, FerryQueryVariables>
    query={FerryDocument}
    {...props}
  />
);

/**
 * __useFerryQuery__
 *
 * To run a query within a React component, call `useFerryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFerryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFerryQuery({
 *   variables: {
 *      ahtiId: // value for 'ahtiId'
 *   },
 * });
 */
export function useFerryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FerryQuery,
    FerryQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<FerryQuery, FerryQueryVariables>(
    FerryDocument,
    baseOptions
  );
}
export function useFerryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FerryQuery,
    FerryQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<FerryQuery, FerryQueryVariables>(
    FerryDocument,
    baseOptions
  );
}
export type FerryQueryHookResult = ReturnType<typeof useFerryQuery>;
export type FerryLazyQueryHookResult = ReturnType<typeof useFerryLazyQuery>;
export type FerryQueryResult = ApolloReactCommon.QueryResult<
  FerryQuery,
  FerryQueryVariables
>;
export const HarborDocument = gql`
  query harbor($ahtiId: String!) {
    harbor(ahtiId: $ahtiId) @client {
      ...CommonFeatures
      pricing {
        hour
        day
        overnight
        week
      }
      depth {
        minDepth
        maxDepth
      }
      mooringTypes
      mooringInformation
      bookingUrl
    }
  }
  ${CommonFeaturesFragmentDoc}
`;
export type HarborComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    HarborQuery,
    HarborQueryVariables
  >,
  'query'
> &
  ({ variables: HarborQueryVariables; skip?: boolean } | { skip: boolean });

export const HarborComponent = (props: HarborComponentProps) => (
  <ApolloReactComponents.Query<HarborQuery, HarborQueryVariables>
    query={HarborDocument}
    {...props}
  />
);

/**
 * __useHarborQuery__
 *
 * To run a query within a React component, call `useHarborQuery` and pass it any options that fit your needs.
 * When your component renders, `useHarborQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHarborQuery({
 *   variables: {
 *      ahtiId: // value for 'ahtiId'
 *   },
 * });
 */
export function useHarborQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    HarborQuery,
    HarborQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<HarborQuery, HarborQueryVariables>(
    HarborDocument,
    baseOptions
  );
}
export function useHarborLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    HarborQuery,
    HarborQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<HarborQuery, HarborQueryVariables>(
    HarborDocument,
    baseOptions
  );
}
export type HarborQueryHookResult = ReturnType<typeof useHarborQuery>;
export type HarborLazyQueryHookResult = ReturnType<typeof useHarborLazyQuery>;
export type HarborQueryResult = ApolloReactCommon.QueryResult<
  HarborQuery,
  HarborQueryVariables
>;
export const IslandDocument = gql`
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
export type IslandComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    IslandQuery,
    IslandQueryVariables
  >,
  'query'
> &
  ({ variables: IslandQueryVariables; skip?: boolean } | { skip: boolean });

export const IslandComponent = (props: IslandComponentProps) => (
  <ApolloReactComponents.Query<IslandQuery, IslandQueryVariables>
    query={IslandDocument}
    {...props}
  />
);

/**
 * __useIslandQuery__
 *
 * To run a query within a React component, call `useIslandQuery` and pass it any options that fit your needs.
 * When your component renders, `useIslandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIslandQuery({
 *   variables: {
 *      ahtiId: // value for 'ahtiId'
 *   },
 * });
 */
export function useIslandQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    IslandQuery,
    IslandQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<IslandQuery, IslandQueryVariables>(
    IslandDocument,
    baseOptions
  );
}
export function useIslandLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    IslandQuery,
    IslandQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<IslandQuery, IslandQueryVariables>(
    IslandDocument,
    baseOptions
  );
}
export type IslandQueryHookResult = ReturnType<typeof useIslandQuery>;
export type IslandLazyQueryHookResult = ReturnType<typeof useIslandLazyQuery>;
export type IslandQueryResult = ApolloReactCommon.QueryResult<
  IslandQuery,
  IslandQueryVariables
>;
