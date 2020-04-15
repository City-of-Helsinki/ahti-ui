import React, { useEffect, useState } from 'react';

export const useScrollToTop = () => {
  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0 });
    }
  }, []);
};

// https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
export const useScrollDisabling = (condition: boolean) => {
  const [windowScroll, setWindowScroll] = useState(true);
  useEffect(() => {
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    const keys: {} = { 37: 1, 38: 1, 39: 1, 40: 1 };

    // modern Chrome requires { passive: false } when adding event
    let supportsPassive = false;

    try {
      window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', {
          get: function () {
            supportsPassive = true;
          },
        })
      );
    } catch (e) {}

    const wheelOpt = supportsPassive ? { passive: false } : false;
    const wheelEvent =
      'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    function preventDefault(e: any) {
      e.preventDefault();
    }

    // call this to Disable
    function disableScroll() {
      window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
      window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    }

    // call this to Enable
    function enableScroll() {
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.removeEventListener(wheelEvent, preventDefault);
      window.removeEventListener('touchmove', preventDefault);
    }

    if (window) {
      setWindowScroll(condition);

      if (windowScroll) {
        enableScroll();
      } else {
        disableScroll();
      }
    }
  }, [condition, windowScroll]);

  return windowScroll;
};
