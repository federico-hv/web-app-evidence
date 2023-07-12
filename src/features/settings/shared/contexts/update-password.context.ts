import { createContext } from 'react';
import { IUpdatePasswordContext } from '../types';

const UpdatePasswordContext = createContext<IUpdatePasswordContext>({
  loading: false,
  data: {
    status: false,
    message: '',
  },
});

const UpdatePasswordContextProvider = UpdatePasswordContext.Provider;

export { UpdatePasswordContextProvider, UpdatePasswordContext };
