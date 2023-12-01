import { MotionDot, StringNumeric } from '../../../index';
import {
  ResponsiveValue,
  SpacingSize,
  ZIndex,
} from '@holdr-ui/react/dist/shared/types';

export interface IndicatorItemProps {
  isActive: boolean;
  onClick?: VoidFunction;
  size?: ResponsiveValue<SpacingSize | StringNumeric>;
  zIndex?: ZIndex;
}

export default function IndicatorDot({
  isActive,
  onClick,
  zIndex = 10,
  size = '0.65rem',
  ...props
}: IndicatorItemProps) {
  return (
    <MotionDot
      onClick={onClick}
      bgColor={isActive ? 'primary400' : 'clearTint400'}
      aria-label='change slide'
      zIndex={zIndex}
      size={size}
      {...props}
    />
  );
}
