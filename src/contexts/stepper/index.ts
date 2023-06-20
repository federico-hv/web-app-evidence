import { createContext } from 'react';
import { IStepperContext } from './stepper-context.type';

const StepperContext = createContext<IStepperContext>({
  step: 0,
  increment: () => {
    console.log();
  },
  decrement: () => {
    console.log();
  },
});

const StepperContextProvider = StepperContext.Provider;

export { StepperContext, StepperContextProvider };
