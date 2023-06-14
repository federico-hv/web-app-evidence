import { createContext } from 'react';
import { IAccountInfo } from 'shared';

const AccountSettingsContext = createContext<IAccountInfo>({
  email: '',
  username: '',
  phone: '',
  country: '',
  gender: '',
  birthday: '',
  protected: false,
});

const AccountSettingsContextProvider = AccountSettingsContext.Provider;

export { AccountSettingsContext, AccountSettingsContextProvider };
