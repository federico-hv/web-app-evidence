import { createContext } from 'react';
import { IAccountInfoContext } from './types';

const AccountInfoContext = createContext<IAccountInfoContext>({
  data: {
    email: '',
    username: '',
    phone: '',
    country: '',
    gender: '',
    birthday: '',
    protected: false,
  },
});

const AccountInfoContextProvider = AccountInfoContext.Provider;

export { AccountInfoContext, AccountInfoContextProvider };
