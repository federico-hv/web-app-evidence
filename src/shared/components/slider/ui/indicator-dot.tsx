import { MotionDot } from 'shared';
import { IndicatorItemProps } from '../shared/types';

export default function IndicatorDot({
  isActive,
  onClick,
}: IndicatorItemProps) {
  return (
    <MotionDot
      zIndex={10}
      onClick={onClick}
      bgColor={isActive ? 'base100' : 'base200'}
      size='0.65rem'
    />
  );
}
