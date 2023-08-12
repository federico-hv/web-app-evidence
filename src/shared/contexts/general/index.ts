import { createContext } from 'react';

const GeneralContext = createContext<{
  state: any;
  update: (next: Partial<any>) => void;
}>({
  state: {},
  update: (next) => {
    console.log(next);
  },
});

const GeneralContextProvider = GeneralContext.Provider;

export { GeneralContext, GeneralContextProvider };
