/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ISLAND
// ====================================================

export interface ISLAND_island_geometry {
  coordinates: any | null;
}

export interface ISLAND_island_properties_tags {
  name: string;
}

export interface ISLAND_island_properties_source {
  system: string;
}

export interface ISLAND_island_properties_contactInfo_address {
  streetAddress: string | null;
  postalCode: string | null;
  municipality: string | null;
}

export interface ISLAND_island_properties_contactInfo {
  phoneNumber: string;
  address: ISLAND_island_properties_contactInfo_address | null;
}

export interface ISLAND_island_properties {
  tags: ISLAND_island_properties_tags[];
  source: ISLAND_island_properties_source;
  name: string;
  description: string | null;
  modifiedAt: any;
  url: string | null;
  contactInfo: ISLAND_island_properties_contactInfo | null;
}

export interface ISLAND_island {
  /**
   * Geometry of the feature
   */
  geometry: ISLAND_island_geometry;
  properties: ISLAND_island_properties | null;
}

export interface ISLAND {
  island: ISLAND_island | null;
}

export interface ISLANDVariables {
  ahtiId: string;
}
