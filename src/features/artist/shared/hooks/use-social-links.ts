import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_SOCIAL_LINKS } from '../../queries';
import { ISocialLink } from '../types';

export function useSocialLinks(id: string) {
  return useQuery<{ socialLinks: ISocialLink[] }, { id: string }>(
    GET_SOCIAL_LINKS,
    {
      variables: { id },
    },
  );
}

export function useSuspenseSocialLinks(id: string) {
  return useSuspenseQuery<{ socialLinks: ISocialLink[] }, { id: string }>(
    GET_SOCIAL_LINKS,
    { variables: { id } },
  );
}
