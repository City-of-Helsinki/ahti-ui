import queryString from 'query-string';

/*
    Searching tag (type==='island') will clear point/line/tag in query
    Searching point (type!=='island') will clear point/line in query
    Searching line will clear point/line in query
*/

export const getPointQuery = (point, parsedSearch) =>
  point.properties.type === 'island'
    ? queryString.stringify({
        tag: point.properties.fi.name,
      })
    : parsedSearch.tag
    ? queryString.stringify({
        tag: parsedSearch.tag,
        name: point.properties.fi.name,
      })
    : queryString.stringify({
        name: point.properties.fi.name,
      });

export const getLineQuery = (clickedPlace, parsedSearch) => {
  return parsedSearch.tag
    ? queryString.stringify({
        tag: parsedSearch.tag,
        line: clickedPlace.properties.name,
      })
    : queryString.stringify({
        line: clickedPlace.properties.name,
      });
};
