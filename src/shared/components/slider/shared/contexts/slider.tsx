import { dummyFn, GenericProps, useRecordState } from 'shared';
import { ISliderContext, ISliderIndex } from '../types';
import { createContext, useContext } from 'react';

const SliderContext = createContext<ISliderContext>({
  numberOfSlides: 0,
  index: { current: 0, previous: -1 },
  updateIndex: dummyFn,
  loop: true,
});

const SliderContextProvider = SliderContext.Provider;

function useSliderContext() {
  return useContext(SliderContext);
}

function SliderProvider({
  loop,
  children,
  numberOfSlides,
}: GenericProps & { numberOfSlides: number; loop: boolean }) {
  const [index, updateIndex] = useRecordState<ISliderIndex>({
    current: 0,
    previous: -1,
  });

  return (
    <SliderContextProvider
      value={{
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
