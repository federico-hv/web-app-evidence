import { HStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { ReactElement } from 'react';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';

export interface SliderIndicatorProps extends HStackProps {
  renderItem?: (
    isActive: boolean,
    onClick: VoidFunction,
    key: string,
  ) => ReactElement;
}
export interface SliderProps extends BoxProps {
  loop?: boolean;
  autoplay?: { active: boolean; delay?: number };
  speed?: number;
  animation?: 'fade' | 'slide';
  type?: 'swipe' | 'drag';
}

export interface ISliderIndex {
  current: number;
  previous: number;
}

export interface ISliderContext {
  index: ISliderIndex;
  updateIndex: (
    next: Partial<ISliderIndex>,
    cb?: (next: ISliderIndex) => void,
  ) => void;
  numberOfSlides: number;
  loop: boolean;
  // animation: 'fade' | 'slide';
  // direction: DirectionNames;
  // setDirection: (dir: DirectionNames) => void;
  // buttonClicked: boolean;
  // setButtonClicked: SetterFunction;
  // loading: boolean;
  // setLoading: SetterFunction;
}

export type SliderSCNames =
  | 'SliderSlide'
  | 'SliderControls'
  | 'SliderIndicator';

export type SliderControlsSCNames =
  | 'SliderNextButton'
  | 'SliderPreviousButton';
