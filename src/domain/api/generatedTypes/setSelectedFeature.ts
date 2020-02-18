/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setSelectedFeature
// ====================================================

export interface setSelectedFeature_setSelectedFeature_properties {
  name: string;
}

export interface setSelectedFeature_setSelectedFeature {
  __typename: "Harbor" | "Ferry";
  properties: setSelectedFeature_setSelectedFeature_properties;
}

export interface setSelectedFeature {
  setSelectedFeature: setSelectedFeature_setSelectedFeature | null;
}

export interface setSelectedFeatureVariables {
  ahtiId?: string | null;
}
