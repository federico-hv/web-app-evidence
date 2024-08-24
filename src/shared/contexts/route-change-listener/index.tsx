import { useLocation } from 'react-router-dom';
import { createContext, useContext, useRef } from 'react';
import { GenericProps, useRecordState } from '@holdr-ui/react';

export interface IRouteChangeListenerContext {
  hasPathChanged: boolean;
  newPathname: string;
  prevPathname: string;
}

const RouteChangeListenerContext =
  createContext<IRouteChangeListenerContext>({
    hasPathChanged: false,
    newPathname: '',
    prevPathname: '',
  });

const RouteChangeListenerContextProvider =
  RouteChangeListenerContext.Provider;

function useRouteChangeListenerContext() {
  return useContext(RouteChangeListenerContext);
}

function RouteChangeListener({ children }: GenericProps) {
  const [state, update] = useRecordState<IRouteChangeListenerContext>({
    hasPathChanged: false,
    newPathname: '',
    prevPathname: '',
  });

  const location = useLocation();
  const previousLocationRef = useRef(location);
  
  return (
    <RouteChangeListenerContextProvider value={state}>
      {children}
    </RouteChangeListenerContextProvider>
  );
}
RouteChangeListener.displayName = 'RouteChangeListener';

export {
  useRouteChangeListenerContext,
  RouteChangeListenerContext,
  RouteChangeListener,
};
