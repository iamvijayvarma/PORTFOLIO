import { useState, useEffect } from 'react';

export interface PerformanceProfile {
  isLowEnd: boolean;
  isTouch: boolean;
}

export const useDevicePerformance = (): PerformanceProfile => {
  const [profile, setProfile] = useState<PerformanceProfile>({
    isLowEnd: false,
    isTouch: false,
  });

  useEffect(() => {
    // 1. Detect touch capabilities
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0;

    // 2. Detect CPU cores (hardware concurrency)
    const cores = navigator.hardwareConcurrency || 4;

    // 3. Detect low-end status based on CPU cores or touch devices
    // If CPU cores <= 4 or touch device (often mobile/tablet), treat as potential low-end for rendering
    let lowEnd = cores <= 4 || isTouchDevice;

    // 4. Fallback check for window size (mobile screens are throttled further)
    if (window.innerWidth < 768) {
      lowEnd = true;
    }

    setProfile({
      isLowEnd: lowEnd,
      isTouch: isTouchDevice,
    });
  }, []);

  return profile;
};
