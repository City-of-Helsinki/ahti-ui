import React, { memo } from 'react';

const MapCard = ({ pointData }) => {
  return (
    (pointData && (
      <div>
        {pointData.properties.fi.name && (
          <h1>name: {pointData.properties.fi.name}</h1>
        )}
        {pointData.properties.type && (
          <h2>type: {pointData.properties.type}</h2>
        )}
        {pointData.properties.fi.description && (
          <p>description: {pointData.properties.fi.description}</p>
        )}
        <p>other stuff goes here</p>
      </div>
    )) ||
    ''
  );
};

export default memo(MapCard);
