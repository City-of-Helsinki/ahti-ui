import React, { useEffect } from 'react';

export const useScrollToTop = () => {
  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0 });
    }
  }, []);
};
