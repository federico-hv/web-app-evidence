import { HStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { ReactElement } from 'react';
import { GenericProps } from 'shared';

export interface SliderIndicatorProps extends HStackProps {
  renderItem?: (idx: number) => ReactElement;
}
export interface SliderProps extends GenericProps {
  loop?: boolean;
  delay?: number;
  autoplay?: boolean;
}

export interface ISliderContext {
  incrementCurrent: VoidFunction;
  decrementCurrent: VoidFunction;
  length: number;
  current: number;
  loop: boolean;
  setCurrent: (current: number) => void;
}

export type SliderSCNames =
  | 'SliderContent'
  | 'SliderControls'
  | 'SliderIndicator';

export type SliderControlsSCNames =
  | 'SliderNextButton'
  | 'SliderPreviousButton';
