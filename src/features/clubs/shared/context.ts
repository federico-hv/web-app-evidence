import { createContext, useContext } from 'react';
import { IClub } from './interfaces';

export const ClubContext = createContext<IClub>({
  artist: { name: '', id: '', bio: '', isVerified: false, avatar: '' },
  createdAt: new Date(),
  id: '',
});

export function useClubContext() {
  return useContext(ClubContext);
}

export const ClubContextProvider = ClubContext.Provider;
