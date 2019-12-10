import React from 'react';
import { GeolocateControl } from 'react-map-gl';

export default class AhtiGeolocateControl extends GeolocateControl {
  _onClickGeolocate = () => {
    this._mapboxGeolocateControl._map = this._context.map;

    if (this.props.showUserLocation) {
      this._mapboxGeolocateControl.on('geolocate', this._updateMarker);
      this._mapboxGeolocateControl.on(
        'trackuserlocationend',
        this._updateMarker
      );
    }

    return this._mapboxGeolocateControl.trigger();
  };

  _renderButton = (type, label, callback) => {
    return (
      <button
        key={type}
        className={`mapboxgl-ctrl-icon mapboxgl-ctrl-${type}`}
        ref={this._geolocateButtonRef}
        type="button"
        title={
          label === 'Geolocate'
            ? this.props.label
              ? this.props.label
              : label
            : label
        }
        onClick={callback}
      />
    );
  };
}
