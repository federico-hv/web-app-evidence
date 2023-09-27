import { RefObject, useEffect, useState } from 'react';
import { useWindowSize } from '@holdr-ui/react';

/**
 * Get a HTML element's width and height
 * @param ref
 */
export function useDimensions<T extends HTMLDivElement | undefined>(
  ref?: RefObject<T>,
) {
  const windowSize = useWindowSize();
  const [dimensions, setHeight] = useState<{
    width: number;
    height: number;
  }>();

  useEffect(() => {
    if (ref && ref.current) {
      setHeight({
        height: ref.current.clientHeight,
        width: ref.current.clientWidth,
      });
    }
  }, [ref, windowSize]);

  return dimensions;
}
