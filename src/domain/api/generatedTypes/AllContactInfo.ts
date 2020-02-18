/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AllContactInfo
// ====================================================

export interface AllContactInfo_contactInfo_address {
  streetAddress: string | null;
  postalCode: string | null;
  municipality: string | null;
}

export interface AllContactInfo_contactInfo {
  phoneNumber: string;
  address: AllContactInfo_contactInfo_address | null;
}

export interface AllContactInfo {
  url: string;
  contactInfo: AllContactInfo_contactInfo;
}
