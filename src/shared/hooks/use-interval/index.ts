import { useEffect, useState } from 'react';

/**
 * Call a function after a specified amount of time.
 *
 * @param period the amount of time to wait before calling the function (seconds)
 * @param cb the callback function to be called.
 *
 * @returns function that resets the interval
 */
export function useInterval(period: number, cb: VoidFunction) {
  const [interval, set] = useState(
    setInterval(() => {
      cb();
    }, period * 1000),
  );

  useEffect(() => {
    return () => clearInterval(interval);
  }, [interval]);

  const reset = () => {
    clearInterval(interval);
    set(
      setInterval(() => {
        cb();
      }, period * 1000),
    );
  };

  return reset;
}
