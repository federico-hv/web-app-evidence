import { ReactNode, useContext } from 'react';
import { useCounter } from '../../hooks';
import { StepperProps } from './types';
import { StepperContext, StepperContextProvider } from '../../contexts';

// TODO: Update this.

function Stepper({ defaultStep = 0, children }: StepperProps) {
  const {
    current: step,
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
Stepper.displayName = 'Stepper';

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
StepperStep.displayName = 'StepperStep';

Stepper.Step = StepperStep;

export { StepperStep };

export default Stepper;
