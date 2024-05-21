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

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<IMe>({
    id: '',
    username: '',
    displayName: '',
    avatar: '',
    role: 'general',
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
