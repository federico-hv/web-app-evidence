import { useEffect, useState } from 'react';

/**
 * Sets a count that is increased by 1 every interval seconds
 *
 * @param interval seconds to be updated
 * @returns the increased count
 */
export function useInterval(interval: number) {
  const [elapsed, set] = useState(0);

  useEffect(() => {
    const intervalFunction = setInterval(() => {
      set(elapsed + 1);
    }, interval * 1000);
    return () => clearInterval(intervalFunction);
  }, [elapsed]);

  return elapsed;
}
