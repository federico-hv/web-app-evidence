import { useEffect } from 'react';

/**
 * Call a function after a specified amount of time.
 *
 * @param interval the amount of time to wait before calling the function (seconds)
 * @param cb the callback function to be called.
 *
 */
export function useInterval(interval: number, cb: VoidFunction) {
  useEffect(() => {
    const intervalFunction = setInterval(() => {
      cb();
    }, interval * 1000);
    return () => clearInterval(intervalFunction);
  }, []); // on page load
}
