import { createContext } from 'react';
import { dummyFn } from '../../utilities';
import { IDialogTabContext } from './types';

const DialogTabContext = createContext<IDialogTabContext>({
  isOpen: false,
  onOpen: (value: string) => console.log(value),
  onClose: dummyFn,
  option: '',
});

const DialogTabContextProvider = DialogTabContext.Provider;

export { DialogTabContext, DialogTabContextProvider };
