import { arrayFrom } from 'shared';
import { SliderIndicatorProps } from '../../shared';
import { MotionDot } from 'shared';
import { HStack } from '@holdr-ui/react';

function SliderIndicator({
  current,
  setCurrent,
  length,
}: SliderIndicatorProps) {
  const steps = arrayFrom(length).map((idx) => (
    <MotionDot
      key={idx}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setCurrent(idx)}
      bgColor={current === idx ? 'base100' : 'base200'}
      size={1}
    />
  ));
  return <HStack gap={3}>{steps}</HStack>;
}

SliderIndicator.displayName = 'SliderStepperIndicator';
export default SliderIndicator;
