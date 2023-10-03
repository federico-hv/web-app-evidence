import { useRecordState } from '../use-record-state';
import { useEffect } from 'react';

/**
 * Get the current top and left scroll positions
 *
 * @param selectors CSS selectors.
 */
export function useScrollPosition(selectors: string): {
  top: number;
  left: number;
} {
  const [state, update] = useRecordState<{
    top: 0;
    left: 0;
  }>({
    top: 0,
    left: 0,
  });

  const node = document.querySelector(selectors);

  useEffect(() => {
    const setPositions = (e: any) =>
      update({ top: e.target.scrollTop, left: e.target.scrollLeft });

    if (node) {
      node.addEventListener('scroll', setPositions);

      return () => node.removeEventListener('scroll', setPositions);
    }
  }, [node, update]);

  return state;
}
