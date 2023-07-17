export interface IStepperContext {
  currentStep: number;
  increment: VoidFunction;
  decrement: VoidFunction;
  reset: VoidFunction;
}
