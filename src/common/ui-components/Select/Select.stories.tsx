import React from 'react';
import { action } from '@storybook/addon-actions';

import Select from './Select';

export default {
  component: Select,
  title: 'Select',
};

export const select = () => (
  <Select
    labelText="Foo"
    value={undefined}
    options={[
      { value: 'foo', label: 'foo' },
      { value: 'bar', label: 'bar' },
    ]}
    onChange={action('changed')}
  />
);

select.story = {
  name: 'Default',
};
