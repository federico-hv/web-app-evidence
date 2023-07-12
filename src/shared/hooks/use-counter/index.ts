import { useState } from 'react';
import { UseCounterType } from './use-counter.type';

/**
 * A hook that manages a state variable (number) that can be incremented or decremented.
 *
 * @returns An object with:
 *  - count - an integer defaulted to 0.
 *  - decrement - a function that subtracts 1 from the current count value.
 *  - increment - a function that adds 1 to the current count value.
 */
export const useCounter: UseCounterType = (defaultValue = 0) => {
  const [count, set] = useState(defaultValue);

  const increment = () => set((prev) => prev + 1);

  const decrement = () => set((prev) => prev - 1);

  const reset = () => set(0);

  return {
    count,
    increment,
    reset,
    decrement,
  };
};
