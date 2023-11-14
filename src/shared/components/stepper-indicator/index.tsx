import React from 'react';
import { StepperIndicatorProps, StepProps } from './types';
import { StyledStepperIndicator } from './styles';
import { MotionBox } from '../../styles';

function StepperIndicator({ children, current }: StepperIndicatorProps) {
  const Steps = React.Children.map(children, (child, index) => {
    return React.cloneElement(child as React.ReactElement, {
      active: index + 1 <= current,
    });
  });

  return <StyledStepperIndicator gap={2}>{Steps}</StyledStepperIndicator>;
}
StepperIndicator.displayName = 'StepperIndicator';

const StepperIndicatorStep = ({ active }: StepProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      bgColor={active ? 'secondary400' : 'base200'}
      className='stepper__step'
      h='3px'
      w='100%'
    />
  );
};
StepperIndicatorStep.displayName = 'StepperIndicatorStep';

StepperIndicator.Step = StepperIndicatorStep;

export { StepperIndicatorStep };

export default StepperIndicator;
