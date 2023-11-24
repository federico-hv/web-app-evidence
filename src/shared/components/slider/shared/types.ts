import { HStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { ReactElement } from 'react';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import { TransitionSpeed } from '../../../types';
import { GenericProps } from '../../../interfaces';

export interface SliderIndicatorProps extends HStackProps {
  renderItem?: (
    isActive: boolean,
    onClick: VoidFunction,
    key: string,
  ) => ReactElement;
}

export interface SliderCommonProps {
  delay: number;
  loop: boolean;
  speed: TransitionSpeed;
  autoPlay?: boolean;
}

export interface SliderProviderProps
  extends GenericProps,
    SliderCommonProps {
  numberOfSlides: number;
}

export interface SliderProps
  extends BoxProps,
    Omit<SliderCommonProps, 'speed' | 'delay' | 'loop'> {
  loop?: boolean;
  delay?: number;
  speed?: TransitionSpeed;
  animation?: 'fade' | 'slide';
}

export interface ISliderContext extends SliderCommonProps {
  index: number;
  updateIndex: (next: number, cb?: (next: number) => void) => void;
  numberOfSlides: number;
}

export type SliderSCNames =
  | 'SliderSlide'
  | 'SliderControls'
  | 'SliderContent'
  | 'SliderIndicator';

export type SliderControlsSCNames =
  | 'SliderNextButton'
  | 'SliderPreviousButton';
