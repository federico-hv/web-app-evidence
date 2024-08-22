import { useLocation } from 'react-router-dom';
import { createContext, useContext, useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (previousLocationRef.current !== location) {
      update({
        hasPathChanged: true,
        prevPathname: previousLocationRef.current.pathname,
        newPathname: location.pathname,
      });

      previousLocationRef.current = location;
    }

    // @ts-ignore
    if (window.pendo) {
      // @ts-ignore
      window.pendo.pageLoad({
        page: {
          url: location.pathname,
        },
      });
    }
  }, [location]);

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
