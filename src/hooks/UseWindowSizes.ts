import { useEffect, useState } from 'react';
import windowSizes, { WindowSizes } from '@/util/WindowSizes';

/**
 * This hook allows you to easily get the size of the window.
 */

export default function useWindowSizes(): WindowSizes {
  const [sizes, setSizes] = useState<WindowSizes>(windowSizes());

  useEffect(() => {
    function onResize() {
      setSizes(windowSizes);
    }

    window.addEventListener('resize', onResize, true);

    return () => {
      window.removeEventListener('resize', onResize, true);
    };
  }, []);

  return sizes;
}
