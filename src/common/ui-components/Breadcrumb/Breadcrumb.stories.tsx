import React, { useState } from 'react';

import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';

const staticBreadcrumbItems: BreadcrumbItem[] = [
  {
    name: 'First',
    id: '1',
  },
  {
    name: 'Second',
    id: '2',
  },
  {
    name: 'Third',
    id: '3',
  },
];

export default {
  title: 'Breadcrumb',
  component: Breadcrumb,
};

export const BreadcrumbStaticData = () => {
  const [breadcrumbItems, setBreadcrumbItems] = useState(staticBreadcrumbItems);

  return (
    <Breadcrumb
      items={breadcrumbItems}
      onClose={(id: string) =>
        setBreadcrumbItems(breadcrumbItems.filter((item) => item.id !== id))
      }
    />
  );
};

BreadcrumbStaticData.story = {
  name: 'Breadcrumb with static data',
};
