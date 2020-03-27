declare module 'react-router-dom';
declare module 'supercluster';

export type NonEmptyArray<T> = [T, ...T[]];

export type LngLat = {
  readonly longitude: number;
  readonly latitude: number;
};

export type Filter = {
  readonly id: string;
  readonly name?: string;
};
