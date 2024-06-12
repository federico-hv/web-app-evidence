import { createContext, Fragment, useContext } from 'react';
import { IClub } from './interfaces';
import { Center, CircularProgress, GenericProps } from '@holdr-ui/react';
import { useQuery } from '@apollo/client';
import { GET_CLUB } from '../queries';
import { useCurrentUser } from '../../auth';
import { useGetClub, useSuspenseGetClub } from './hooks';
import { GQLRenderer } from '../../../shared';

const ClubContext = createContext<IClub>({
  artist: { name: '', id: '', bio: '', isVerified: false, avatar: '' },
  createdAt: new Date(),
  id: '',
});

function useClubContext() {
  return useContext(ClubContext);
}

export const ClubContextProvider = ClubContext.Provider;

function ClubProvider({ children }: GenericProps) {
  return (
    <Fragment>
      <Content>{children}</Content>
    </Fragment>
  );
}

function Content({ children }: GenericProps) {
  const currentUser = useCurrentUser();

  const { data } = useSuspenseGetClub({
    accountId: currentUser.id,
  });

  return (
    <GQLRenderer>
      <ClubContextProvider value={{ ...data.club }}>
        {children}
      </ClubContextProvider>
    </GQLRenderer>
  );
}

export { ClubProvider, useClubContext, ClubContext };
