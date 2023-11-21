import { HStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { ReactElement } from 'react';
import { GenericProps } from 'shared';

export interface SliderIndicatorProps extends HStackProps {
  renderItem?: (idx: number) => ReactElement;
}
export interface SliderProps extends GenericProps {
  loop?: boolean;
  autoplay?: { active: boolean; delay?: number };
  speed?: number;
  animation?: 'fade' | 'slide';
  type?: 'swipe' | 'drag';
}

export interface ISliderContext {
  incrementCurrent: VoidFunction;
  decrementCurrent: VoidFunction;
  length: number;
  current: number;
  loop: boolean;
  speed: number;
  animation: 'fade' | 'slide';
  setCurrent: (current: number) => void;
  direction: DirectionNames;
  setDirection: (dir: DirectionNames) => void;
  buttonClicked: boolean;
  setButtonClicked: (state: boolean) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
}

export type SliderSCNames =
  | 'SliderSlide'
  | 'SliderControls'
  | 'SliderIndicator';

export type SliderControlsSCNames =
  | 'SliderNextButton'
  | 'SliderPreviousButton';

export type DirectionNames = 'left' | 'right';
