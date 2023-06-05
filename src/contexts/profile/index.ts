import { createContext, useContext } from 'react';
import { IProfileContext } from './profile.types';

const ProfileContext = createContext<IProfileContext>({
  profile: Object(),
});

const ProfileContextProvider = ProfileContext.Provider;

const useProfileContext = () => useContext(ProfileContext);

export { ProfileContextProvider, ProfileContext, useProfileContext };
