import { useSwitch } from '@holdr-ui/react';
import { useEffect } from 'react';

/**
 * Detect whether scrolled to bottom of elements height.
 *
 * @param selector CSS selector.
 */
export function useIsBottomOf(selector: string) {
  const { switchState, turnOn, turnOff } = useSwitch();

  const node = document.querySelector(selector);

  useEffect(() => {
    if (node) {
      node.addEventListener('scroll', (e: any) => {
        if (
          e.target.scrollHeight - e.target.scrollTop ===
          e.target.clientHeight
        ) {
          turnOn();
        } else turnOff();
      });
    }
  }, [node, turnOn, turnOff]);

  return switchState;
}
