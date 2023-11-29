import { HStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { Dispatch, ReactElement, SetStateAction } from 'react';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import { TransitionSpeed } from '../../../types';
import { GenericProps } from '../../../interfaces';
import { ZIndex } from '@holdr-ui/react/dist/shared/types';
import { IconButtonProps } from '@holdr-ui/react/dist/components/icon-button/src/icon-button.styles';

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
  current?: number;
  autoPlay?: boolean;
}

export interface SliderProviderProps
  extends GenericProps,
    SliderCommonProps {
  numberOfSlides: number;
}

export interface SliderButtonProps extends Partial<IconButtonProps> {
  zIndex?: ZIndex;
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
  setIndex: Dispatch<SetStateAction<number>>;
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
