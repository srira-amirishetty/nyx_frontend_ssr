import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setScreenSize('sm');
      } else if (width <= 768) {
        setScreenSize('md');
      } else if (width <= 1024) {
        setScreenSize('lg');
      } else if (width <= 1280) {
        setScreenSize('xl');
      } else {
        setScreenSize('2xl');
      }
    };

    // Initial call to set screen size on component mount
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;