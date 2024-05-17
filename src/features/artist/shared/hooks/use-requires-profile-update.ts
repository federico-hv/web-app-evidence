import { useQuery, useSuspenseQuery } from '@apollo/client';
import { REQUIRES_PROFILE_UPDATE } from '../../queries';

export function useRequiresProfileUpdate() {
  return useQuery<{ requiresProfileUpdate: boolean }>(
    REQUIRES_PROFILE_UPDATE,
  );
}

export function useSuspenseRequiresProfileUpdate() {
  return useSuspenseQuery<{ requiresProfileUpdate: boolean }>(
    REQUIRES_PROFILE_UPDATE,
  );
}
