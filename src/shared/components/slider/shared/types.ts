import { CenterProps } from '@holdr-ui/react/dist/components/center/src/center.types';
import { HStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { ReactElement } from 'react';

export interface SliderIndicatorProps extends HStackProps {
  renderItem?: (
    isActive: boolean,
    onClick: VoidFunction,
    key: string,
  ) => ReactElement;
}

export interface IndicatorItemProps {
  key: string;
  onClick: VoidFunction;
  isActive: boolean;
}

export interface SliderProps extends CenterProps {
  loop?: boolean;
  autoplay?: boolean;
  delay?: number;
  speed?: number;
  animation?: 'fade' | 'slide';
  type?: 'swipe' | 'drag';
}

export interface ISliderContext {
  incrementCurrent: VoidFunction;
  decrementCurrent: VoidFunction;
  length: number;
  setLength: (length: number) => void;
  current: number;
  loop: boolean;
  speed: number;
  animation: 'fade' | 'slide';
  setCurrent: (current: number) => void;
  buttonClicked: boolean;
  setButtonClicked: SetterFunction;
  loading: boolean;
  setLoading: SetterFunction;
}

export type SliderSCNames =
  | 'SliderControls'
  | 'SliderIndicator'
  | 'SliderContent';

export type SliderContentSCNames = 'SliderSlide';

export type SliderControlsSCNames =
  | 'SliderNextButton'
  | 'SliderPreviousButton';

export type DirectionNames = 'left' | 'right';
type SetterFunction = (state: boolean) => void;
