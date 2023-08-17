import { useEffect } from 'react';

/**
 *  Scroll to the top of a node
 *
 * @param node an HTML Element
 */
export function useScrollToTop(node: Element | null) {
  useEffect(() => {
    if (node) node.scrollTo(0, 0);
  }, [node]);
}
