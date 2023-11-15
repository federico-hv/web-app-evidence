import { useState } from 'react';

export function useSlider(length: number) {
  const [state, set] = useState(0);

  const withinBounds = (index: number) => index < length && index >= 0;

  const setCurrent = (curr: number) =>
    withinBounds(curr) ? set(curr) : set(0);

  const incrementCurrent = () => {
    withinBounds(state + 1) ? set(state + 1) : set(0);
  };

  const decrementCurrent = () =>
    withinBounds(state - 1) ? set(state - 1) : set(length - 1);

  return {
    incrementCurrent,
    decrementCurrent,
    setCurrent,
    current: state,
  };
}
