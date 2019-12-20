import { useCallback, useState, useEffect } from 'react';

interface WindowSize {
  readonly width: number;
  readonly height: number;
}

const useWindowSize = (): WindowSize => {
  const getSize = useCallback(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  const [windowSize, setWindowSize] = useState<WindowSize>(getSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [getSize]);

  return windowSize;
};

export { useWindowSize };
