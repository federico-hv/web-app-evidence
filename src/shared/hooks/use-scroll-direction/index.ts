import { useEffect, useState } from 'react';

/**
 * Get the scroll direction of the current node and its delta
 */

export function useScrollDirection(): {
  direction: 'up' | 'down';
  delta: number;
} {
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [delta, setDelta] = useState<number>(0);
  const [oldTop, setOldTop] = useState<number>(window.scrollY || 0);

  useEffect(() => {
    const onScroll = () => {
      setDelta(Math.abs(window.scrollY - oldTop));

      if (oldTop > window.scrollY) {
        setDirection('up');
      } else if (oldTop < window.scrollY) {
        setDirection('down');
      }

      setOldTop(() => {
        return window.scrollY;
      });
    };

    window.addEventListener('scroll', onScroll);

    return () => window.addEventListener('scroll', onScroll);
  }, [oldTop, setDelta, setDirection, setOldTop]);

  return { direction, delta };
}
