import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

/**
 * Router component that sends a pageView whenever the
 * location changes. Forwards all props and ref to the
 * wrapped component.
 */
const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    ReactGA.set({
      page: page,
      ...options,
    });
    ReactGA.pageview(page);
  };

  const HOC = React.forwardRef((props, ref) => {
    useEffect(
      () => trackPage(props.location.pathname + props.location.search),
      [props.location.pathname, props.location.search]
    );

    return <WrappedComponent {...props} ref={ref} />;
  });

  return HOC;
};

export default withTracker;
