import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@apollo/client';
import { GenericProps, GQLRenderer, IMe, Loader } from '../../shared';
import {
  AuthContextProvider,
  AuthProviderProps,
  IAuthContext,
} from './shared';
import { GET_ME } from './queries';
import AuthRedirect from '../../pages/auth-redirect';
import { useWindowSize } from '@holdr-ui/react';
import LogRocket from 'logrocket';
import { UserRoleEnum } from '../user';

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<IMe>({
    id: '',
    username: '',
    displayName: '',
    avatar: '',
    role: UserRoleEnum.GeneralUser,
  });

  return (
    <Content currentUser={currentUser} setCurrentUser={setCurrentUser}>
      {children}
    </Content>
  );
}
AuthProvider.displayName = 'AuthProvider';

function Content({
  currentUser,
  setCurrentUser,
  children,
}: IAuthContext & GenericProps) {
  const { height } = useWindowSize();
  const { data } = useSuspenseQuery<{ me: IMe }>(GET_ME);

  useEffect(() => {
    setCurrentUser(data.me);
  }, [data, setCurrentUser]);

  useEffect(() => {
    // Initialize user session in log rocket
    // if (import.meta.env.VITE_ENVIRONMENT !== 'staging') return;

    LogRocket.identify(data.me.id, {
      name: data.me.username,
      role: data.me.role,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window['pendo']) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window['pendo'].initialize({
        visitor: {
          id: data.me.id,
          username: data.me.username,
          role: data.me.role,
        },
        account: {
          id: `holdr:account::${data.me.id}`,
        },
      });
    }
  }, [data]);

  return (
    <GQLRenderer
      ErrorFallback={() => <AuthRedirect />}
      LoadingFallback={<Loader loading={true} h={height} />}
    >
      <AuthContextProvider value={{ currentUser, setCurrentUser }}>
        {children}
      </AuthContextProvider>
    </GQLRenderer>
  );
}

export { AuthProvider };
