import { createContext, ReactNode, useContext } from 'react';
import { useCounter } from '../../../../v2/shared';
import { dummyFn } from '../../../utilities';

interface IStepperContext {
  currentStep: number;
  increment: VoidFunction;
  decrement: VoidFunction;
  reset: VoidFunction;
}

const StepperContext = createContext<IStepperContext>({
  currentStep: 0,
  increment: dummyFn,
  decrement: dummyFn,
  reset: dummyFn,
});

const StepperContextProvider = StepperContext.Provider;

interface StepperProps {
  defaultStep?: number;
  children?: ReactNode;
}

function Stepper({ defaultStep = 0, children }: StepperProps) {
  const {
    count: step,
    increment,
    decrement,
    reset,
  } = useCounter(defaultStep);
  return (
    <StepperContextProvider
      value={{ currentStep: step, increment, decrement, reset }}
    >
      {children}
    </StepperContextProvider>
  );
}

const StepperStep = ({
  children,
  step,
}: {
  step: number;
  children?: ReactNode;
}) => {
  const { currentStep } = useContext(StepperContext);
  return <>{currentStep === step ? <>{children}</> : <></>}</>;
};
StepperStep.displayNaeme = 'StepperStep';

Stepper.Step = StepperStep;

export { Stepper, StepperStep };
