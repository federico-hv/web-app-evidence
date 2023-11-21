import { dummyFn } from 'shared';
import { ISliderContext } from '../types';
import { createContext, useContext } from 'react';

const SliderContext = createContext<ISliderContext>({
  incrementCurrent: dummyFn,
  decrementCurrent: dummyFn,
  setCurrent: dummyFn,
  length: 0,
  current: 0,
  loop: true,
  direction: 'left',
  animation: 'fade',
  setDirection: dummyFn,
  speed: 0,
  buttonClicked: false,
  setButtonClicked: dummyFn,
  loading: false,
  setLoading: dummyFn,
  drag: false,
  setDrag: dummyFn,
});

const SliderContextProvider = SliderContext.Provider;

function useSliderContext() {
  return useContext(SliderContext);
}

export { SliderContext, SliderContextProvider, useSliderContext };
