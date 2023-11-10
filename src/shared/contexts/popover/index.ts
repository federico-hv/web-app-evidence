import { createContext } from 'react';
import { dummyFn } from '../../utilities';
import { IPopoverContext } from './types';

const PopoverContext = createContext<IPopoverContext>({
  isOpen: false,
  setOpen: dummyFn,
  setClosed: dummyFn,
});

const PopoverContextProvider = PopoverContext.Provider;

export { PopoverContextProvider, PopoverContext };
