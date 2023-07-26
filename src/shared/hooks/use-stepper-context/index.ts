import { useContext } from 'react';
import { StepperContext } from '../../contexts';

export function useStepperContext() {
  return useContext(StepperContext);
}
