import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import '../src/common/translation/i18n/i18n';

import '../src/styles/index.scss';

addDecorator(withA11y);

configure(require.context('../src/', true, /\.stories\.tsx$/), module);
