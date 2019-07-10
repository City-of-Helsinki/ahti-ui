import React from 'react';

export default ({ info }) => {
  return (
    <div>
      <h1>{info.name}</h1>
      <p>type: {info.type}</p>
      <a href={info.website}> website </a>
    </div>
  );
};
