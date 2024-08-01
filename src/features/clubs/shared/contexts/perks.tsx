import { createContext, useContext } from 'react';
import { IPerk } from '../types';
import { GQLRenderer } from '../../../../shared';
import { GenericProps } from '@holdr-ui/react';
import { useSuspenseGetClubPerks } from '../hooks';

const PerksContext = createContext<{ clubPerks: IPerk[] }>({
  clubPerks: [],
});

const PerksContextProvider = PerksContext.Provider;
const PerksContextConsumer = PerksContext.Consumer;

function usePerksContext() {
  return useContext(PerksContext);
}

function PerksProvider({
  clubId,
  children,
}: GenericProps & { clubId: string }) {
  return (
    <GQLRenderer>
      <Content id={clubId}>{children}</Content>
    </GQLRenderer>
  );
}

function Content({ id, children }: GenericProps & { id: string }) {
  const { data } = useSuspenseGetClubPerks(id);

  return (
    <PerksContextProvider value={{ clubPerks: data.clubPerks }}>
      {children}
    </PerksContextProvider>
  );
}

export {
  PerksProvider,
  PerksContextProvider,
  PerksContextConsumer,
  usePerksContext,
};
