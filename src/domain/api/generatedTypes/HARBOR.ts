/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HARBOR
// ====================================================

export interface HARBOR_harbor_geometry {
  coordinates: any | null;
}

export interface HARBOR_harbor_properties_tags {
  name: string;
}

export interface HARBOR_harbor_properties_source {
  system: string;
}

export interface HARBOR_harbor_properties_contactInfo_address {
  streetAddress: string | null;
  postalCode: string | null;
  municipality: string | null;
}

export interface HARBOR_harbor_properties_contactInfo {
  phoneNumber: string;
  address: HARBOR_harbor_properties_contactInfo_address | null;
}

export interface HARBOR_harbor_properties {
  tags: HARBOR_harbor_properties_tags[];
  source: HARBOR_harbor_properties_source;
  name: string;
  description: string | null;
  modifiedAt: any;
  url: string;
  contactInfo: HARBOR_harbor_properties_contactInfo;
}

export interface HARBOR_harbor {
  geometry: HARBOR_harbor_geometry;
  properties: HARBOR_harbor_properties;
}

export interface HARBOR {
  harbor: HARBOR_harbor | null;
}

export interface HARBORVariables {
  ahtiId: string;
}
