/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSelectedFeature
// ====================================================

export interface getSelectedFeature_selectedFeature_properties {
  name: string;
}

export interface getSelectedFeature_selectedFeature {
  __typename: "Harbor" | "Ferry";
  properties: getSelectedFeature_selectedFeature_properties;
}

export interface getSelectedFeature {
  selectedFeature: getSelectedFeature_selectedFeature | null;
}
