import { CenterVariantProps } from '@holdr-ui/react/dist/components/center/src/center.types';
import { MotionDot, StringNumeric, dummyFn } from '../../../index';
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
      bgColor={isActive ? 'clearTint400' : 'darkTint300'}
      aria-label='change slide'
      zIndex={zIndex}
      size={size}
      {...props}
    />
  );
}
