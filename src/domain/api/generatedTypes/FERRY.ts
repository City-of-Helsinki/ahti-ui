/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FERRY
// ====================================================

export interface FERRY_ferry_geometry {
  coordinates: any | null;
}

export interface FERRY_ferry_properties_tags {
  name: string;
}

export interface FERRY_ferry_properties_source {
  system: string;
}

export interface FERRY_ferry_properties_contactInfo_address {
  streetAddress: string | null;
  postalCode: string | null;
  municipality: string | null;
}

export interface FERRY_ferry_properties_contactInfo {
  phoneNumber: string;
  address: FERRY_ferry_properties_contactInfo_address | null;
}

export interface FERRY_ferry_properties {
  tags: FERRY_ferry_properties_tags[];
  source: FERRY_ferry_properties_source;
  name: string;
  description: string | null;
  modifiedAt: any;
  url: string;
  contactInfo: FERRY_ferry_properties_contactInfo;
}

export interface FERRY_ferry {
  geometry: FERRY_ferry_geometry;
  properties: FERRY_ferry_properties;
}

export interface FERRY {
  ferry: FERRY_ferry | null;
}

export interface FERRYVariables {
  ahtiId: string;
}
