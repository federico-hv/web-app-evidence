import { MotionDot } from 'shared';
import { useSliderContext } from '../shared/contexts';
import { IndicatorItemProps } from '../shared/types';

export default function IndicatorDot({
  isActive,
  onClick,
}: IndicatorItemProps) {
  return (
    <MotionDot
      zIndex={10}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      bgColor={isActive ? 'base100' : 'base200'}
      size='0.65rem'
    />
  );
}
