export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type TranslatedField = {
  fi: string;
  en: string;
  sv: string;
};

export type Submission = {
  name: TranslatedField;
  description: TranslatedField;
  shortDescription: TranslatedField;
  tagIds: string[];
  categoryId: string;
  website: string;
  streetAddress: string;
  postalCode: string;
  municipality: string;
  phoneNumber: string;
  email: string;
  coordinates: Coordinates;
};
