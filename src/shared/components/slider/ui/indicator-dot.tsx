import { MotionDot } from '../../../index';

export interface IndicatorItemProps {
  isActive: boolean;
  onClick?: VoidFunction;
}

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
      bgColor={isActive ? 'clearTint400' : 'darkTint300'}
      size='0.65rem'
      aria-label='change slide'
    />
  );
}
