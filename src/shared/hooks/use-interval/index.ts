import { useEffect, useState } from 'react';
/**
 * Call a function after a specified amount of time.
 *
 * @param period the amount of time to wait before calling the function (seconds)
 * @param cb the callback function to be called.
 *
 * @returns functions that stop and starts the interval
 */
export function useInterval(period: number, cb: VoidFunction) {
  // any should be NodeJS.Timer | undefined
  const [interval, set] = useState<any>(undefined);

  useEffect(() => {
    const itvl = setInterval(cb, period * 1000);
    set(itvl);
    return () => clearInterval(itvl);
  }, []);

  const stop = () => {
    clearInterval(interval);
    set(undefined);
  };

  const start = () => {
    set(setInterval(cb, period * 1000));
  };

  return { stop, start };
}
