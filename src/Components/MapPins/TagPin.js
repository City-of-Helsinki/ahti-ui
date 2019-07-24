import React, { PureComponent } from 'react';

import { ReactComponent as Tag } from '../../assets/icons/tag.svg';
import { ReactComponent as TagFill } from '../../assets/icons/tag_fill.svg';

export default class CityPin extends PureComponent {
  render() {
    const { onClick, isActive, isCurrent } = this.props;
    const size = isActive ? 48 : 24;
    return isCurrent ? (
      <TagFill
        viewBox="0 0 48 48"
        height={size}
        style={{
          cursor: 'pointer',
          transform: `translate(${-size / 2}px,${-size}px)`,
        }}
        onClick={onClick}
      />
    ) : (
      <Tag
        viewBox="0 0 48 48"
        height={size}
        style={{
          cursor: 'pointer',
          transform: `translate(${-size / 2}px,${-size}px)`,
        }}
        onClick={onClick}
      />
    );
  }
}
