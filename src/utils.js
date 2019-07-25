import queryString from 'query-string';

/*
    Searching tag (type==='island') will clear point/line/tag in query
    Searching point (type!=='island') will clear point/line in query
    Searching line will clear point/line in query
*/

export const getQuery = (point, search) =>
  point.properties.type === 'island'
    ? queryString.stringify({
        tag: point.properties.fi.name,
      })
    : queryString.parse(search).tag
    ? queryString.stringify({
        tag: queryString.parse(search).tag,
        name: point.properties.fi.name,
      })
    : queryString.stringify({
        name: point.properties.fi.name,
      });

export const getRouteQuery = (clickedPlace, search) => {
  return queryString.parse(search).tag
    ? queryString.stringify({
        tag: queryString.parse(search).tag,
        line: clickedPlace.properties.name,
      })
    : queryString.stringify({
        line: clickedPlace.properties.name,
      });
};
