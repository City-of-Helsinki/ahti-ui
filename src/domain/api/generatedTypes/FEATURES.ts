/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FEATURES
// ====================================================

export interface FEATURES_features_edges_node_geometry {
  coordinates: any | null;
}

export interface FEATURES_features_edges_node_properties_tags {
  name: string;
}

export interface FEATURES_features_edges_node_properties_contactInfo_address {
  postalCode: string | null;
  municipality: string | null;
}

export interface FEATURES_features_edges_node_properties_contactInfo {
  phoneNumber: string;
  address: FEATURES_features_edges_node_properties_contactInfo_address | null;
}

export interface FEATURES_features_edges_node_properties_images {
  url: string;
  copyrightOwner: string;
}

export interface FEATURES_features_edges_node_properties_source {
  system: string;
}

export interface FEATURES_features_edges_node_properties_ferries_properties {
  ahtiId: string;
  name: string;
}

export interface FEATURES_features_edges_node_properties_ferries {
  properties: FEATURES_features_edges_node_properties_ferries_properties;
}

export interface FEATURES_features_edges_node_properties_harbors_properties {
  ahtiId: string;
  name: string;
}

export interface FEATURES_features_edges_node_properties_harbors {
  properties: FEATURES_features_edges_node_properties_harbors_properties;
}

export interface FEATURES_features_edges_node_properties {
  ahtiId: string;
  type: string;
  name: string;
  tags: FEATURES_features_edges_node_properties_tags[];
  description: string | null;
  url: string | null;
  contactInfo: FEATURES_features_edges_node_properties_contactInfo | null;
  images: FEATURES_features_edges_node_properties_images[];
  source: FEATURES_features_edges_node_properties_source;
  modifiedAt: any;
  ferries: FEATURES_features_edges_node_properties_ferries[];
  harbors: FEATURES_features_edges_node_properties_harbors[];
}

export interface FEATURES_features_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  type: string | null;
  /**
   * Geometry of the feature
   */
  geometry: FEATURES_features_edges_node_geometry;
  properties: FEATURES_features_edges_node_properties | null;
}

export interface FEATURES_features_edges {
  /**
   * The item at the end of the edge
   */
  node: FEATURES_features_edges_node | null;
}

export interface FEATURES_features {
  /**
   * Contains the nodes in this connection.
   */
  edges: (FEATURES_features_edges | null)[];
}

export interface FEATURES {
  features: FEATURES_features | null;
}
