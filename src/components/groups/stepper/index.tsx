import { createContext, ReactNode, useContext } from 'react';

interface IStepperContext {
  currentStep: number;
}

const StepperContext = createContext<IStepperContext>({ currentStep: 0 });

const StepperContextProvider = StepperContext.Provider;

interface StepperProps {
  currentStep: number;
  children?: ReactNode;
}

function Stepper({ currentStep, children }: StepperProps) {
  return (
    <StepperContextProvider value={{ currentStep }}>
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
