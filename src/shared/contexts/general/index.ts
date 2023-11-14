import { createContext } from 'react';
import { StringNumeric } from '../../types';

type GeneralContextType = {
  state: StringNumeric | Record<StringNumeric, StringNumeric> | any;
  update: (next: Partial<StringNumeric> | StringNumeric | any) => void;
};

const GeneralContext: React.Context<GeneralContextType> =
  createContext<GeneralContextType>({
    state: {},
    update: (next) => {
      console.log(next);
    },
  });

const GeneralContextProvider = GeneralContext.Provider;
const GeneralContextConsumer = GeneralContext.Consumer;

export { GeneralContext, GeneralContextProvider, GeneralContextConsumer };
