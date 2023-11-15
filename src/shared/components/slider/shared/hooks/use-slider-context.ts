import { useContext } from 'react';
import { SliderContext } from '../contexts';

export function useSliderContext() {
  return useContext(SliderContext);
}
