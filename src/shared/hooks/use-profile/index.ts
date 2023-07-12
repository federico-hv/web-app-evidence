import { useContext } from 'react';
import { ProfileContext } from '../../contexts';

export function useProfile() {
  const { profile, loading } = useContext(ProfileContext);

  return { profile, loading };
}
