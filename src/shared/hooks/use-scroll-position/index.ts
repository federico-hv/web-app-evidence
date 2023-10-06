import { useRecordState } from '../use-record-state';
import { useEffect } from 'react';

/**
 * Get the current top and left scroll positions
 *
 */
export function useScrollPosition(): {
  top: number;
  left: number;
} {
  const [state, update] = useRecordState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });

  // const node = document.querySelector(selectors);

  useEffect(() => {
    const setPositions = () =>
      update({ top: window.scrollY, left: window.scrollX });

    window.addEventListener('scroll', setPositions);

    return () => window.removeEventListener('scroll', setPositions);
  }, [update]);

  return state;
}
