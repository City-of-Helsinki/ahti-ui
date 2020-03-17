declare module 'react-router-dom';

export type NonEmptyArray<T> = [T, ...T[]];

export type Filter = {
  readonly id: string;
  readonly name?: string;
};
