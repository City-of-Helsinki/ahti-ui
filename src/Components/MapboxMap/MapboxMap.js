import React from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// const defaultViewport = {
//   latitude: 60.15,
//   longitude: 24.944,
//   zoom: 10,
//   bearing: 0,
//   pitch: 0,
//   minzoom: 3,
//   maxzoom: 9,
// };

// function MapboxMap(props) {
//   return (
//     <MapGL
//       ref={map}
//       {...viewport}
//       mapStyle="mapbox://styles/ohel/cjxodqmm92eao1cqnjz85qnww"
//       mapboxApiAccessToken={process.env.REACT_APP_ACCESSTOKEN}
//       width="100%"
//       height="100%"
//       onViewportChange={viewport => setViewport(viewport)}
//       clickRadius={2}
//     >
//       {pointData.map((point, index) => (
//         <Marker
//           key={`marker-${index}`}
//           longitude={point.location.longitude}
//           latitude={point.location.latitude}
//         >
//           <CityPin size={50} onClick={() => _markerOnClick(point)} />
//         </Marker>
//       ))}
//     </MapGL>
//   );
// }

export default class MapboxMap extends React.Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 60.15,
      longitude: 24.944,
      zoom: 10,
      minzoom: 3,
      maxzoom: 9,
      bearing: 0,
      pitch: 0,
    },
  };

  render() {
    console.log('hello, map');
    return (
      <MapGL
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapStyle="mapbox://styles/ohel/cjxodqmm92eao1cqnjz85qnww"
        mapboxApiAccessToken={process.env.REACT_APP_ACCESSTOKEN}
        className="map"
      />
    );
  }
}
