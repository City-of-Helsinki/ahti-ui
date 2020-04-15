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
  Geometry: any;
  DateTime: Date;
  Decimal: any;
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

export type Depth = {
  __typename?: 'Depth';
  min: Scalars['Float'];
  max: Scalars['Float'];
};

export type Distance = {
  unit: DistanceUnitEnum;
  value: Scalars['Float'];
  geometry: Scalars['Geometry'];
};

export enum DistanceUnitEnum {
  Chain = 'chain',
  ChainBenoit = 'chain_benoit',
  ChainSears = 'chain_sears',
  BritishChainBenoit = 'british_chain_benoit',
  BritishChainSears = 'british_chain_sears',
  BritishChainSearsTruncated = 'british_chain_sears_truncated',
  Cm = 'cm',
  BritishFt = 'british_ft',
  BritishYd = 'british_yd',
  ClarkeFt = 'clarke_ft',
  ClarkeLink = 'clarke_link',
  Fathom = 'fathom',
  Ft = 'ft',
  Furlong = 'furlong',
  GermanM = 'german_m',
  GoldCoastFt = 'gold_coast_ft',
  IndianYd = 'indian_yd',
  Inch = 'inch',
  Km = 'km',
  Link = 'link',
  LinkBenoit = 'link_benoit',
  LinkSears = 'link_sears',
  M = 'm',
  Mi = 'mi',
  Mm = 'mm',
  Nm = 'nm',
  NmUk = 'nm_uk',
  Rod = 'rod',
  SearsYd = 'sears_yd',
  SurveyFt = 'survey_ft',
  Um = 'um',
  Yd = 'yd',
}

export type ExternalLink = {
  __typename?: 'ExternalLink';
  type: Scalars['String'];
  url: Scalars['String'];
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
  distanceLte?: Maybe<Distance>;
  updatedSince?: Maybe<Scalars['DateTime']>;
  taggedWithAny?: Maybe<Array<Maybe<Scalars['String']>>>;
  taggedWithAll?: Maybe<Array<Maybe<Scalars['String']>>>;
  category?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type FeatureConnection = {
  __typename?: 'FeatureConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<FeatureEdge>>;
};

export type FeatureDetails = {
  __typename?: 'FeatureDetails';
  harbor?: Maybe<HarborDetails>;
  priceList: Array<Maybe<PriceTag>>;
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
  details?: Maybe<FeatureDetails>;
  ferries: Array<Ferry>;
  images: Array<Image>;
  links: Array<ExternalLink>;
  modifiedAt: Scalars['DateTime'];
  name: Scalars['String'];
  oneLiner: Scalars['String'];
  openingHoursPeriods: Array<OpeningHoursPeriod>;
  parents: Array<Maybe<Feature>>;
  shortDescription: Scalars['String'];
  source: FeatureSource;
  tags: Array<Tag>;
  teaser?: Maybe<Teaser>;
  translations: Array<FeatureTranslations>;
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
  Sv = 'SV',
}

export type FeatureTranslations = {
  __typename?: 'FeatureTranslations';
  languageCode: FeatureTranslationLanguageCode;
  name: Scalars['String'];
  url: Scalars['String'];
  oneLiner: Scalars['String'];
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

export type HarborDetails = {
  __typename?: 'HarborDetails';
  moorings?: Maybe<Array<HarborMooringType>>;
  depth?: Maybe<Depth>;
};

export enum HarborMooringType {
  Slip = 'SLIP',
  SternBuoy = 'STERN_BUOY',
  SternPole = 'STERN_POLE',
  Quayside = 'QUAYSIDE',
  SeaBuoy = 'SEA_BUOY',
}

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

export type PriceTag = {
  __typename?: 'PriceTag';
  id: Scalars['ID'];
  feature: Feature;
  price: Scalars['Decimal'];
  item: Scalars['String'];
  unit?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  feature?: Maybe<Feature>;
  featureCategories?: Maybe<Array<Maybe<FeatureCategory>>>;
  features?: Maybe<FeatureConnection>;
  ferry?: Maybe<Ferry>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type QueryFeatureArgs = {
  id?: Maybe<Scalars['ID']>;
  ahtiId?: Maybe<Scalars['String']>;
};

export type QueryFeaturesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  distanceLte?: Maybe<Distance>;
  updatedSince?: Maybe<Scalars['DateTime']>;
  taggedWithAny?: Maybe<Array<Maybe<Scalars['String']>>>;
  taggedWithAll?: Maybe<Array<Maybe<Scalars['String']>>>;
  category?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryFerryArgs = {
  ahtiId: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  features: FeatureConnection;
  name: Scalars['String'];
};

export type TagFeaturesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  distanceLte?: Maybe<Distance>;
  updatedSince?: Maybe<Scalars['DateTime']>;
  taggedWithAny?: Maybe<Array<Maybe<Scalars['String']>>>;
  taggedWithAll?: Maybe<Array<Maybe<Scalars['String']>>>;
  category?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Teaser = {
  __typename?: 'Teaser';
  id: Scalars['ID'];
  feature: Feature;
  header?: Maybe<Scalars['String']>;
  main?: Maybe<Scalars['String']>;
};

export enum Weekday {
  Monday = 'MONDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
  Thursday = 'THURSDAY',
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
}

export type CommonFeaturesFragment = { __typename?: 'Ferry' } & {
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

export type CategoriesQueryVariables = {};

export type CategoriesQuery = { __typename?: 'Query' } & {
  featureCategories: Maybe<
    Array<
      Maybe<
        { __typename?: 'FeatureCategory' } & Pick<
          FeatureCategory,
          'id' | 'name'
        >
      >
    >
  >;
};

export type FeatureQueryVariables = {
  ahtiId?: Maybe<Scalars['String']>;
};

export type FeatureQuery = { __typename?: 'Query' } & {
  feature: Maybe<
    { __typename?: 'Feature' } & Pick<Feature, 'id' | 'type'> & {
        geometry: { __typename?: 'GeometryObjectType' } & Pick<
          GeometryObjectType,
          'type' | 'coordinates'
        >;
        properties: Maybe<
          { __typename?: 'FeatureProperties' } & Pick<
            FeatureProperties,
            | 'ahtiId'
            | 'name'
            | 'description'
            | 'shortDescription'
            | 'url'
            | 'modifiedAt'
          > & {
              details: Maybe<
                { __typename?: 'FeatureDetails' } & {
                  harbor: Maybe<
                    { __typename?: 'HarborDetails' } & Pick<
                      HarborDetails,
                      'moorings'
                    > & {
                        depth: Maybe<
                          { __typename?: 'Depth' } & Pick<Depth, 'min' | 'max'>
                        >;
                      }
                  >;
                }
              >;
              children: Array<
                Maybe<
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
                        }
                    >;
                  }
                >
              >;
              parents: Array<
                Maybe<
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
                        }
                    >;
                  }
                >
              >;
              category: Maybe<
                { __typename?: 'FeatureCategory' } & Pick<FeatureCategory, 'id'>
              >;
              links: Array<
                { __typename?: 'ExternalLink' } & Pick<
                  ExternalLink,
                  'type' | 'url'
                >
              >;
              tags: Array<{ __typename?: 'Tag' } & Pick<Tag, 'id' | 'name'>>;
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
                { __typename?: 'Image' } & Pick<Image, 'url' | 'copyrightOwner'>
              >;
              source: { __typename?: 'FeatureSource' } & Pick<
                FeatureSource,
                'system'
              >;
              ferries: Array<
                { __typename?: 'Ferry' } & {
                  properties: {
                    __typename?: 'GenericFeatureProperties';
                  } & Pick<GenericFeatureProperties, 'ahtiId' | 'name'>;
                }
              >;
            }
        >;
      }
  >;
};

export type FeaturesQueryVariables = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  category?: Maybe<Array<Maybe<Scalars['String']>>>;
  tag?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type FeaturesQuery = { __typename?: 'Query' } & {
  features: Maybe<
    { __typename?: 'FeatureConnection' } & {
      pageInfo: { __typename?: 'PageInfo' } & Pick<
        PageInfo,
        'startCursor' | 'endCursor' | 'hasNextPage'
      >;
      edges: Array<
        Maybe<
          { __typename?: 'FeatureEdge' } & Pick<FeatureEdge, 'cursor'> & {
              node: Maybe<
                { __typename?: 'Feature' } & Pick<Feature, 'id' | 'type'> & {
                    geometry: { __typename?: 'GeometryObjectType' } & Pick<
                      GeometryObjectType,
                      'type' | 'coordinates'
                    >;
                    properties: Maybe<
                      { __typename?: 'FeatureProperties' } & Pick<
                        FeatureProperties,
                        | 'ahtiId'
                        | 'name'
                        | 'description'
                        | 'shortDescription'
                        | 'url'
                        | 'modifiedAt'
                      > & {
                          details: Maybe<
                            { __typename?: 'FeatureDetails' } & {
                              harbor: Maybe<
                                { __typename?: 'HarborDetails' } & Pick<
                                  HarborDetails,
                                  'moorings'
                                > & {
                                    depth: Maybe<
                                      { __typename?: 'Depth' } & Pick<
                                        Depth,
                                        'min' | 'max'
                                      >
                                    >;
                                  }
                              >;
                            }
                          >;
                          children: Array<
                            Maybe<
                              { __typename?: 'Feature' } & {
                                properties: Maybe<
                                  { __typename?: 'FeatureProperties' } & Pick<
                                    FeatureProperties,
                                    'ahtiId' | 'name'
                                  > & {
                                      category: Maybe<
                                        {
                                          __typename?: 'FeatureCategory';
                                        } & Pick<FeatureCategory, 'id'>
                                      >;
                                    }
                                >;
                              }
                            >
                          >;
                          parents: Array<
                            Maybe<
                              { __typename?: 'Feature' } & {
                                properties: Maybe<
                                  { __typename?: 'FeatureProperties' } & Pick<
                                    FeatureProperties,
                                    'ahtiId' | 'name'
                                  > & {
                                      category: Maybe<
                                        {
                                          __typename?: 'FeatureCategory';
                                        } & Pick<FeatureCategory, 'id'>
                                      >;
                                    }
                                >;
                              }
                            >
                          >;
                          category: Maybe<
                            { __typename?: 'FeatureCategory' } & Pick<
                              FeatureCategory,
                              'id'
                            >
                          >;
                          links: Array<
                            { __typename?: 'ExternalLink' } & Pick<
                              ExternalLink,
                              'type' | 'url'
                            >
                          >;
                          tags: Array<
                            { __typename?: 'Tag' } & Pick<Tag, 'id' | 'name'>
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
      } & CommonFeaturesFragment
  >;
};

export type TagsQueryVariables = {};

export type TagsQuery = { __typename?: 'Query' } & {
  tags: Maybe<Array<Maybe<{ __typename?: 'Tag' } & Pick<Tag, 'id' | 'name'>>>>;
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
export const CategoriesDocument = gql`
  query categories {
    featureCategories {
      id
      name
    }
  }
`;
export type CategoriesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >,
  'query'
>;

export const CategoriesComponent = (props: CategoriesComponentProps) => (
  <ApolloReactComponents.Query<CategoriesQuery, CategoriesQueryVariables>
    query={CategoriesDocument}
    {...props}
  />
);

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    baseOptions
  );
}
export function useCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    CategoriesQuery,
    CategoriesQueryVariables
  >(CategoriesDocument, baseOptions);
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<
  typeof useCategoriesLazyQuery
>;
export type CategoriesQueryResult = ApolloReactCommon.QueryResult<
  CategoriesQuery,
  CategoriesQueryVariables
>;
export const FeatureDocument = gql`
  query feature($ahtiId: String) {
    feature(ahtiId: $ahtiId) {
      id
      type
      geometry {
        type
        coordinates
      }
      properties {
        ahtiId
        details {
          harbor {
            moorings
            depth {
              min
              max
            }
          }
        }
        children {
          properties {
            ahtiId
            name
            category {
              id
            }
          }
        }
        parents {
          properties {
            ahtiId
            name
            category {
              id
            }
          }
        }
        category {
          id
        }
        links {
          type
          url
        }
        name
        tags {
          id
          name
        }
        description
        shortDescription @client
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
      }
    }
  }
`;
export type FeatureComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FeatureQuery,
    FeatureQueryVariables
  >,
  'query'
>;

export const FeatureComponent = (props: FeatureComponentProps) => (
  <ApolloReactComponents.Query<FeatureQuery, FeatureQueryVariables>
    query={FeatureDocument}
    {...props}
  />
);

/**
 * __useFeatureQuery__
 *
 * To run a query within a React component, call `useFeatureQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeatureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeatureQuery({
 *   variables: {
 *      ahtiId: // value for 'ahtiId'
 *   },
 * });
 */
export function useFeatureQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FeatureQuery,
    FeatureQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<FeatureQuery, FeatureQueryVariables>(
    FeatureDocument,
    baseOptions
  );
}
export function useFeatureLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FeatureQuery,
    FeatureQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<FeatureQuery, FeatureQueryVariables>(
    FeatureDocument,
    baseOptions
  );
}
export type FeatureQueryHookResult = ReturnType<typeof useFeatureQuery>;
export type FeatureLazyQueryHookResult = ReturnType<typeof useFeatureLazyQuery>;
export type FeatureQueryResult = ApolloReactCommon.QueryResult<
  FeatureQuery,
  FeatureQueryVariables
>;
export const FeaturesDocument = gql`
  query features(
    $after: String
    $first: Int
    $category: [String]
    $tag: [String]
  ) {
    features(
      after: $after
      first: $first
      category: $category
      taggedWithAny: $tag
    ) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          type
          geometry {
            type
            coordinates
          }
          properties {
            ahtiId
            details {
              harbor {
                moorings
                depth {
                  min
                  max
                }
              }
            }
            children {
              properties {
                ahtiId
                name
                category {
                  id
                }
              }
            }
            parents {
              properties {
                ahtiId
                name
                category {
                  id
                }
              }
            }
            category {
              id
            }
            links {
              type
              url
            }
            name
            tags {
              id
              name
            }
            description
            shortDescription @client
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
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      category: // value for 'category'
 *      tag: // value for 'tag'
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
export const TagsDocument = gql`
  query tags {
    tags {
      id
      name
    }
  }
`;
export type TagsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<TagsQuery, TagsQueryVariables>,
  'query'
>;

export const TagsComponent = (props: TagsComponentProps) => (
  <ApolloReactComponents.Query<TagsQuery, TagsQueryVariables>
    query={TagsDocument}
    {...props}
  />
);

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<TagsQuery, TagsQueryVariables>
) {
  return ApolloReactHooks.useQuery<TagsQuery, TagsQueryVariables>(
    TagsDocument,
    baseOptions
  );
}
export function useTagsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TagsQuery,
    TagsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<TagsQuery, TagsQueryVariables>(
    TagsDocument,
    baseOptions
  );
}
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsQueryResult = ApolloReactCommon.QueryResult<
  TagsQuery,
  TagsQueryVariables
>;
