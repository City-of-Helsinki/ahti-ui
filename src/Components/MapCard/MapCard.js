import React from 'react';

export default ({ pointData }) => {
  return (
    pointData && (
      <div>
        {pointData.properties.name && (
          <h1>name: {pointData.properties.name}</h1>
        )}
        {pointData.properties.type && (
          <h2>type: {pointData.properties.type}</h2>
        )}
        {pointData.properties.description && (
          <p>description: {pointData.properties.description}</p>
        )}
        <p>other stuff goes here</p>
      </div>
    )
  );
};
