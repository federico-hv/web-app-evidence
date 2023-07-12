import { createContext } from 'react';
import { dummyFn } from '../../utilities';
import { IStepperContext } from './types';

const StepperContext = createContext<IStepperContext>({
  currentStep: 0,
  increment: dummyFn,
  decrement: dummyFn,
  reset: dummyFn,
});

const StepperContextProvider = StepperContext.Provider;

export { StepperContext, StepperContextProvider };
