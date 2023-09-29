import { useScrollDirection } from '../use-scroll-direction';
import { useEffect } from 'react';

/**
 * Calls an action after scrolling by offset.
 *
 * @param selectors CSS selectors
 * @param offset
 * @param action action to be executed
 */
export function useActOnScroll(
  selectors: string,
  offset: number,
  action: VoidFunction,
) {
  const { delta } = useScrollDirection('#root');
  const node = document.querySelector(selectors);

  useEffect(() => {
    const act = () => {
      if (delta > offset) {
        action();
      }
    };

    if (node) {
      node.addEventListener('scroll', act);

      return () => node.removeEventListener('scroll', act);
    }
  }, [delta, node, offset, action]);
}
