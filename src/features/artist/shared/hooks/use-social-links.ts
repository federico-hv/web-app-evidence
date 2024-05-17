import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_SOCIAL_LINKS } from '../../queries';
import { ISocialLink } from '../types';

export function useSocialLinks() {
  return useQuery<{ socialLinks: ISocialLink[] }>(GET_SOCIAL_LINKS);
}

export function useSuspenseSocialLinks() {
  return useSuspenseQuery<{ socialLinks: ISocialLink[] }>(
    GET_SOCIAL_LINKS,
  );
}
