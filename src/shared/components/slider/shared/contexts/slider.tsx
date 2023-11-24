import { dummyFn } from 'shared';
import { ISliderContext, SliderProviderProps } from '../types';
import { createContext, useContext, useState } from 'react';

const SliderContext = createContext<ISliderContext>({
  numberOfSlides: 0,
  delay: 0,
  index: 0,
  updateIndex: dummyFn,
  loop: true,
  speed: 'duration-slower',
  autoPlay: false,
});

const SliderContextProvider = SliderContext.Provider;

function useSliderContext() {
  return useContext(SliderContext);
}

function SliderProvider({
  autoPlay,
  loop,
  delay,
  speed,
  children,
  numberOfSlides,
}: SliderProviderProps) {
  const [index, setIndex] = useState<number>(0);

  const updateIndex = (next: number, cb?: (next: number) => void) =>
    setIndex(() => {
      if (cb) {
        cb(next);
      }
      return next;
    });

  return (
    <SliderContextProvider
      value={{
        autoPlay,
        speed,
        delay,
        loop,
        index,
        numberOfSlides,
        updateIndex,
      }}
    >
      {children}
    </SliderContextProvider>
  );
}

export {
  SliderContext,
  SliderContextProvider,
  useSliderContext,
  SliderProvider,
};
