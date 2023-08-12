import { createContext, useContext } from 'react';

interface IMenuContent {
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
}

const MenuContext = createContext<IMenuContent>({
  isOpen: false,
  onOpen: () => console.log(''),
  onClose: () => console.log(''),
});

const MenuContextProvider = MenuContext.Provider;

function useMenuContext() {
  return useContext(MenuContext);
}

export { MenuContext, MenuContextProvider, useMenuContext };
