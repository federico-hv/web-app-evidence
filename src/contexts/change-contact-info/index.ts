import { createContext } from 'react';

const ChangeContactInfoContext = createContext<{
  name: 'phone' | 'email';
  update: (value: string) => void;
  phone?: string;
  email?: string;
  close: VoidFunction;
}>({
  phone: '',
  email: '',
  name: 'phone',
  update: (value) => console.log(value),
  close: () => console.log(),
});

const ChangeContactInfoContextProvider = ChangeContactInfoContext.Provider;

export { ChangeContactInfoContext, ChangeContactInfoContextProvider };
