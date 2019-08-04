import queryString from 'query-string';

export const getPointQuery = (point, parsedSearch) =>
  parsedSearch.type
    ? queryString.stringify({
        type: parsedSearch.type,
        name: point.properties.fi.name,
      })
    : queryString.stringify({
        name: point.properties.fi.name,
      });

export const getLineQuery = (clickedPlace, parsedSearch) =>
  parsedSearch.type
    ? queryString.stringify({
        type: parsedSearch.type,
        line: clickedPlace.properties.name,
      })
    : queryString.stringify({
        line: clickedPlace.properties.name,
      });
