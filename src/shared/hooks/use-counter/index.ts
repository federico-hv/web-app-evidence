import { useState } from 'react';

/**
 * A hook that manages a state variable (number) that can be incremented or decremented.
 *
 * @returns An object with:
 *  - count - an integer defaulted to 0.
 *  - decrement - a function that subtracts 1 from the current count value.
 *  - increment - a function that adds 1 to the current count value.
 */
export function useCounter(initial = 1, limit = 1) {
  const [current, setCurrentStep] = useState(initial);

  const increment = () =>
    current + 1 <= limit && setCurrentStep((prev) => prev + 1);

  const decrement = () =>
    current - 1 >= initial && setCurrentStep((prev) => prev - 1);

  const reset = () => setCurrentStep(initial);

  return {
    current,
    increment,
    decrement,
    reset,
  };
}
