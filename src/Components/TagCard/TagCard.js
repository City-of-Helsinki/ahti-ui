import React, { memo } from 'react';

const TagCard = ({ pointData, tagName }) => {
  return (
    <div>
      <h3>Interesting places in {tagName}: </h3>
      <hr />
      <ul>
        {pointData &&
          pointData.map((point, id) => (
            <li key={id}>
              {point.properties.fi.name && (
                <h4>name: {point.properties.fi.name}</h4>
              )}
              {point.properties.type && <h5>type: {point.properties.type}</h5>}
              {point.properties.fi.header && (
                <p>header: {point.properties.fi.header}</p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

// TODO: get rid of react memeo as soon as we optimize the map page component

export default memo(TagCard);
