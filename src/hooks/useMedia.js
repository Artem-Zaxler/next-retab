import { useState, useEffect } from 'react';

const useMedia = () => {
  const [deviceType, setDeviceType] = useState({
    isDesktop: false,
    isTablet: false,
    isMobile: false,
  });

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width > 1024) {
        setDeviceType({ isDesktop: true, isTablet: false, isMobile: false });
      } else if (width >= 480 && width <= 1024) {
        setDeviceType({ isDesktop: false, isTablet: true, isMobile: false });
      } else if (width < 480) {
        setDeviceType({ isDesktop: false, isTablet: false, isMobile: true });
      }
    };

    updateDeviceType();

    window.addEventListener('resize', updateDeviceType);

    return () => {
      window.removeEventListener('resize', updateDeviceType);
    };
  }, []);

  return deviceType;
};

export default useMedia;
