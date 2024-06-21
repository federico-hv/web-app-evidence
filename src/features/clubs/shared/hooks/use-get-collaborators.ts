import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_ARTIST_COLLABORATORS } from '../../queries';
import { ICollaborator } from '../../../../shared';

/**
 *
 * @param id the artist ID
 */
export function useGetCollaborators(id: string) {
  return useQuery<{ collaborators: ICollaborator[] }, { id: string }>(
    GET_ARTIST_COLLABORATORS,
    {
      variables: {
        id,
      },
    },
  );
}

/**
 *
 * @param id the artist ID
 */
export function useSuspenseGetCollaborators(id: string) {
  return useSuspenseQuery<
    { collaborators: ICollaborator[] },
    { id: string }
  >(GET_ARTIST_COLLABORATORS, {
    variables: {
      id,
    },
  });
}
