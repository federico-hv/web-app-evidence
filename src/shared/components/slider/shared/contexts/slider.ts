import { dummyFn } from 'shared';
import { ISliderContext } from '../types';
import { createContext } from 'react';

const SliderContext = createContext<ISliderContext>({
  incrementCurrent: dummyFn,
  decrementCurrent: dummyFn,
  setCurrent: dummyFn,
  length: 0,
  current: 0,
});

const SliderContextProvider = SliderContext.Provider;

export { SliderContext, SliderContextProvider };
