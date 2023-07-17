import { createContext } from 'react';
import { dummyFn } from '../../utilities';
import { IDialogContext } from './types';

const DialogContext = createContext<IDialogContext>({
  isOpen: false,
  onOpen: dummyFn,
  onClose: dummyFn,
});

const DialogContextProvider = DialogContext.Provider;

export { DialogContextProvider, DialogContext };
