import { useEffect, useState } from 'react';

/**
 * Detect whether scrolled to bottom of elements height.
 *
 */
export function useIsBottom() {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsBottom(
        Math.ceil(window.innerHeight + window.scrollY) >=
          document.documentElement.scrollHeight,
      );
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return isBottom;
}
