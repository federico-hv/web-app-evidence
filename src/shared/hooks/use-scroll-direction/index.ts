import { useEffect, useState } from 'react';

/**
 * Get the scroll direction of the current node and its delta
 *
 * @param selectors CSS selectors.
 */
export function useScrollDirection(selectors: string): {
  direction: 'up' | 'down';
  delta: number;
} {
  const node = document.querySelector(selectors);

  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [delta, setDelta] = useState<number>(0);
  const [oldTop, setOldTop] = useState<number>(node?.scrollTop || 0);

  useEffect(() => {
    if (!node) return;

    const updateDirection = (e: any) => {
      setDelta(Math.abs(e.target.scrollTop - oldTop));

      if (oldTop > e.target.scrollTop) {
        setDirection('up');
      } else if (oldTop < e.target.scrollTop) {
        setDirection('down');
      }

      setOldTop(e.target.scrollTop);
    };

    node.addEventListener('scroll', updateDirection);

    return () => node.addEventListener('scroll', updateDirection);
  }, [node, oldTop]);

  return { direction, delta };
}
