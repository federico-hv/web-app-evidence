import { createContext } from 'react';
import { IAccountInfoFormContext } from './account-info.form.types';

const AccountInfoFormContext = createContext<IAccountInfoFormContext>({
  data: {},
  name: 'name',
});

const AccountInfoFormContextProvider = AccountInfoFormContext.Provider;

export { AccountInfoFormContext, AccountInfoFormContextProvider };
