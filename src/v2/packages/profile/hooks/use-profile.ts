import { useContext } from 'react';
import { ProfileContext } from '../context';

export function useProfile() {
  const { profile, loading } = useContext(ProfileContext);

  return { profile, loading };
}
