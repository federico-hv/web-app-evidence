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
});

const SliderContextProvider = SliderContext.Provider;

function useSliderContext() {
  return useContext(SliderContext);
}

export { SliderContext, SliderContextProvider, useSliderContext };
