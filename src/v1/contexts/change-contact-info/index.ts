import { createContext } from 'react';
import { IChangeContactInfoContext } from './change-contact-info-context.types';

const ChangeContactInfoContext = createContext<IChangeContactInfoContext>({
  phone: '',
  email: '',
  name: 'phone',
  update: (value) => console.log(value),
  close: () => console.log(),
});

const ChangeContactInfoContextProvider = ChangeContactInfoContext.Provider;

export { ChangeContactInfoContext, ChangeContactInfoContextProvider };
