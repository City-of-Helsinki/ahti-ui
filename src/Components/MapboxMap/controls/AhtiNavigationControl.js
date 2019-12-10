import React from 'react';
import { NavigationControl } from 'react-map-gl';

export default class AhtiNavigationControl extends NavigationControl {
  _render() {
    const { className, showZoom, zoomInLabel, zoomOutLabel } = this.props;

    return (
      <div
        className={`mapboxgl-ctrl mapboxgl-ctrl-group ${className}`}
        ref={this._containerRef}
      >
        {showZoom &&
          this._renderButton(
            'zoom-in',
            zoomInLabel ? zoomInLabel : 'Zoom In',
            this._onZoomIn
          )}
        {showZoom &&
          this._renderButton(
            'zoom-out',
            zoomOutLabel ? zoomOutLabel : 'Zoom Out',
            this._onZoomOut
          )}
      </div>
    );
  }
}
