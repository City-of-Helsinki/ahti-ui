import React from 'react';

import CategoryNavigation from './CategoryNavigation';

export default {
  title: 'CategoryNavigation',
  component: CategoryNavigation,
};

const noop = () => {
  /* NOOP */
};

export const MultipleCategories = () => (
  <CategoryNavigation
    categories={[
      { id: 'ahti:category:island', name: 'Islands' },
      { id: 'ahti:category:island', name: 'Islands' },
      { id: 'ahti:category:island', name: 'Islands' },
      { id: 'ahti:category:island', name: 'Islands' },
      { id: 'ahti:category:island', name: 'Islands' },
      { id: 'ahti:category:island', name: 'Islands' },
      { id: 'ahti:category:island', name: 'Islands' },
    ]}
    onClick={noop}
  />
);

MultipleCategories.story = {
  name: 'Multiple categories',
};

export const SingleCategory = () => (
  <CategoryNavigation
    categories={[{ id: 'ahti:category:island', name: 'Islands' }]}
    onClick={noop}
  />
);

SingleCategory.story = {
  name: 'Single category',
};

export const MaxItemsCategories = () => (
  <CategoryNavigation
    categories={[
      { id: 'ahti:category:island', name: 'Islands' },
      { id: 'ahti:category:island', name: 'Islands' },
      { id: 'ahti:category:island', name: 'Islands' },
    ]}
    maxDisplayedCategories={3}
    onClick={noop}
  />
);

MaxItemsCategories.story = {
  name: 'Max items # of categories',
};
