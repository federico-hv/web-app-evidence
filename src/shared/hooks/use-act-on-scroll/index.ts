import { useScrollDirection } from '../use-scroll-direction';
import { useEffect } from 'react';

/**
 * Calls an action after scrolling by offset.
 *
 * @param offset
 * @param action action to be executed
 */
export function useActOnScroll(offset: number, action: VoidFunction) {
  const { delta } = useScrollDirection();
  // const node = document.querySelector(selectors);

  useEffect(() => {
    const act = () => {
      if (delta > offset) {
        action();
      }
    };

    window.addEventListener('scroll', act);

    return () => window.removeEventListener('scroll', act);
  }, [delta, offset, action]);
}
