import { useEffect, useState } from 'react';

export function useTimer(interval: number) {
  const [elapsed, set] = useState(0);

  useEffect(() => {
    const intervalFunction = setInterval(() => {
      set(elapsed + 1);
    }, interval);
    return () => clearInterval(intervalFunction);
  }, [elapsed]);

  return { elapsed };
}
