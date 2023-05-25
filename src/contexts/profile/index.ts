import { createContext } from 'react';
import { IProfileContext } from './profile.types';

const ProfileContext = createContext<IProfileContext>({
  profile: Object(),
});

const ProfileContextProvider = ProfileContext.Provider;

export { ProfileContextProvider, ProfileContext };
