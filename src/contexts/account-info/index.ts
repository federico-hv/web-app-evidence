import { createContext } from 'react';
import { IAccountInfoContext } from './account-info.types';

const AccountInfoContext = createContext<IAccountInfoContext>({
  data: {},
  name: 'test',
});

const AccountInfoContextProvider = AccountInfoContext.Provider;

export { AccountInfoContext, AccountInfoContextProvider };
