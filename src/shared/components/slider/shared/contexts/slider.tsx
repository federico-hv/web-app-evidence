import { dummyFn } from 'shared';
import { ISliderContext, SliderProviderProps } from '../types';
import { createContext, useContext, useState } from 'react';

const SliderContext = createContext<ISliderContext>({
  numberOfSlides: 0,
  delay: 0,
  index: 0,
  setIndex: dummyFn,
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

  return (
    <SliderContextProvider
      value={{
        autoPlay,
        speed,
        delay,
        loop,
        numberOfSlides,
        index,
        setIndex,
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
