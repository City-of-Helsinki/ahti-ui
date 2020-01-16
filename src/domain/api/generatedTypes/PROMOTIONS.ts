/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PROMOTIONS
// ====================================================

export interface PROMOTIONS_features_edges_node_properties_images {
  url: string;
}

export interface PROMOTIONS_features_edges_node_properties {
  name: string | null;
  images: PROMOTIONS_features_edges_node_properties_images[];
}

export interface PROMOTIONS_features_edges_node {
  properties: PROMOTIONS_features_edges_node_properties | null;
}

export interface PROMOTIONS_features_edges {
  /**
   * The item at the end of the edge
   */
  node: PROMOTIONS_features_edges_node | null;
}

export interface PROMOTIONS_features {
  /**
   * Contains the nodes in this connection.
   */
  edges: (PROMOTIONS_features_edges | null)[];
}

export interface PROMOTIONS {
  features: PROMOTIONS_features | null;
}
