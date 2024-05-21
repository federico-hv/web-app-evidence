import { createContext, useContext } from 'react';
import { IMeArtist } from '../types';
import { useQuery } from '@apollo/client';
import { GET_ME_ARTIST } from '../../queries';
import { FullPageLoader, GenericProps, Loader } from '../../../../shared';
import { useWindowSize } from '@holdr-ui/react';

export const ArtistContext = createContext<IMeArtist | null>({
  id: '',
});

export const ArtistContextProvider = ArtistContext.Provider;

export function useCurrentArtist() {
  return useContext(ArtistContext);
}

export function ArtistProvider({ children }: GenericProps) {
  const { height } = useWindowSize();

  const { loading, error, data } = useQuery<{
    meArtist: IMeArtist | null;
  }>(GET_ME_ARTIST);

  return (
    <Loader loading={loading} h={height}>
      {data && (
        <ArtistContextProvider value={data.meArtist}>
          {children}
        </ArtistContextProvider>
      )}
    </Loader>
  );
}
