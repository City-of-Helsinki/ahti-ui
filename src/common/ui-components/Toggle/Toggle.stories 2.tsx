import React, { useState } from 'react';
import { IconClose, IconCheck } from 'hds-react';

import Toggle from './Toggle';

export default {
  title: 'Toggle',
  component: Toggle
};

export const ToggleExample = () => {
  const [toggleState, setToggleState] = useState(true);
  return (
    <Toggle
      onIcon={<IconCheck />}
      offIcon={<IconClose />}
      toggleState={toggleState}
      onToggle={() => setToggleState(!toggleState)}
    />
  );
};
