import { createContext, Fragment, useContext } from 'react';
import { IClub } from '../interfaces';
import { GenericProps } from '@holdr-ui/react';
import { useCurrentUser } from '../../../auth';
import { useSuspenseGetClub } from '../hooks';
import { GQLRenderer } from '../../../../shared';

const ClubContext = createContext<IClub>({
  createdAt: new Date(),
  id: '',
});

function useClubContext() {
  return useContext(ClubContext);
}

const ClubContextProvider = ClubContext.Provider;
const ClubContextConsumer = ClubContext.Consumer;

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

export {
  ClubProvider,
  useClubContext,
  ClubContext,
  ClubContextProvider,
  ClubContextConsumer,
};
