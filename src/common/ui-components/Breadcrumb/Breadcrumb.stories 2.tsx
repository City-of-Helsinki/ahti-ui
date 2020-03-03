import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';
import React, { useState } from 'react';

const staticBreadcrumbItems: BreadcrumbItem[] = [
  {
    category: 'a',
    name: 'First',
    id: '1'
  },
  {
    category: 'a',
    name: 'Second',
    id: '2'
  },
  {
    category: 'a',
    name: 'Third',
    id: '3'
  }
];

export default {
  title: 'Breadcrumb',
  component: Breadcrumb
};

export const BreadcrumbStaticData = () => {
  const [breadcrumbItems, setBreadcrumbItems] = useState(staticBreadcrumbItems);

  return (
    <Breadcrumb
      items={breadcrumbItems}
      onClose={(id: string) =>
        setBreadcrumbItems(breadcrumbItems.filter(item => item.id !== id))
      }
    />
  );
};

BreadcrumbStaticData.story = {
  name: 'Breadcrumb with static data'
};
