/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommonFeatures
// ====================================================

export interface CommonFeatures_geometry {
  coordinates: any | null;
}

export interface CommonFeatures_properties_tags {
  name: string;
}

export interface CommonFeatures_properties_source {
  system: string;
}

export interface CommonFeatures_properties_contactInfo_address {
  streetAddress: string | null;
  postalCode: string | null;
  municipality: string | null;
}

export interface CommonFeatures_properties_contactInfo {
  phoneNumber: string;
  address: CommonFeatures_properties_contactInfo_address | null;
}

export interface CommonFeatures_properties {
  tags: CommonFeatures_properties_tags[];
  source: CommonFeatures_properties_source;
  name: string;
  description: string | null;
  modifiedAt: any;
  url: string;
  contactInfo: CommonFeatures_properties_contactInfo;
}

export interface CommonFeatures {
  geometry: CommonFeatures_geometry;
  properties: CommonFeatures_properties;
}
