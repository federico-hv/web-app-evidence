import { ReactElement } from 'react';
import { GenericProps } from 'shared';

export interface SliderIndicatorProps extends GenericProps {
  renderFunction?: (
    active: boolean,
    idx: number,
    setCurrent: (current: number) => void,
  ) => ReactElement;
}

export interface ISliderContext {
  incrementCurrent: VoidFunction;
  decrementCurrent: VoidFunction;
  length: number;
  current: number;
  setCurrent: (current: number) => void;
}

export type SliderSCNames =
  | 'SliderContent'
  | 'SliderControls'
  | 'SliderIndicator';

export type SliderControlsSCNames =
  | 'SliderNextButton'
  | 'SliderPreviousButton';
