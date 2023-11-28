import { useState } from 'react';

/**
 * a circular count that has values [0, max]
 *
 * @param max maximum possible value
 * @returns incrementCount: increment count function
 *          decrementCount: decrement count function
 *          setCount: count setter
 *          count: count value
 */
export function useCircularCount(max: number) {
  const [state, set] = useState(0);

  const withinBounds = (index: number) => index < max && index >= 0;

  const setCount = (curr: number) =>
    withinBounds(curr) ? set(curr) : set(0);

  const incrementCount = () => {
    withinBounds(state + 1) ? set(state + 1) : set(0);
  };

  const decrementCount = () =>
    withinBounds(state - 1) ? set(state - 1) : set(max - 1);

  return {
    incrementCount,
    decrementCount,
    setCount,
    count: state,
  };
}
