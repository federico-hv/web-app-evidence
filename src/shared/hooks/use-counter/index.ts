import { useState } from 'react';

/**
 * A hook that manages a state variable (number) that can be incremented or decremented.
 *
 * @returns An object with:
 *  - count - an integer defaulted to 0.
 *  - decrement - a function that subtracts 1 from the current count value.
 *  - increment - a function that adds 1 to the current count value.
 */
export function useCounter(
  initial = 1,
  limit?: number,
): [
  number,
  (byAmount?: number) => void,
  (byAmount?: number) => void,
  VoidFunction,
] {
  const [current, setCurrentStep] = useState(initial);

  const increment = (byAmount = 1) => {
    if (limit && current + byAmount > limit) return;
    setCurrentStep((prev) => prev + byAmount);
  };

  const decrement = (byAmount = 1) => {
    if (current - byAmount < initial) return;
    setCurrentStep((prev) => prev - byAmount);
  };

  const reset = () => setCurrentStep(initial);

  return [current, increment, decrement, reset];
}
