import { gql, useMutation } from '@apollo/client';
import { CREATE_RELATIONSHIP, REMOVE_RELATIONSHIP } from './schema';
import {
  CreateRelationshipInput,
  CreateRelationshipModel,
  RemoveRelationshipInput,
  RemoveRelationshipModel,
} from '../shared';
import { useToast } from '../../../shared';
import { ReadFieldFunction } from '@apollo/client/cache/core/types/common';
import follow from '../ui/follow';

interface ICreateRelationshipArgs {
  createRelationship: CreateRelationshipModel;
}

interface IRemoveRelationshipArgs {
  removeRelationship: RemoveRelationshipModel;
}

function updateLists(
  current: any,
  readField: ReadFieldFunction,
  accountId: string,
  data?: ICreateRelationshipArgs | IRemoveRelationshipArgs | null,
) {
  if (
    !(
      data &&
      ('createRelationship' in data || 'removeRelationship' in data)
    )
  ) {
    return current;
  }

  try {
    return current.edges.map((followerRef: any) => {
      const id = readField('id', followerRef.node);

      if (id === accountId) {
        if ('createRelationship' in data) {
          return {
            ...followerRef.node,
            relationshipStatusInfo: data.createRelationship,
          };
        } else if ('removeRelationship' in data) {
          return {
            ...followerRef.node,
            relationshipStatusInfo: data.removeRelationship,
          };
        }
      }

      return followerRef;
    });
  } catch (e) {
    console.error(e);
  }
  return current;
}

/**
 * Custom create relationship that
 * updates the cache in relation
 * to the following/followers list
 */
export function useCustomCreateRelationshipMutation(accountId: string) {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<
    ICreateRelationshipArgs,
    { payload: CreateRelationshipInput }
  >(CREATE_RELATIONSHIP);

  const create = async (payload: CreateRelationshipInput) => {
    try {
      return await mutate({
        variables: { payload },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              followers(current = {}, { readField }) {
                updateLists(current, readField, accountId, data);
              },
              following(current = {}, { readField }) {
                updateLists(current, readField, accountId, data);
              },
              relationshipCount(current = {}, { readField }) {
                const following = readField('following', current);

                if (!following) return current;

                return {
                  ...current,
                  following: (following as number) + 1,
                };
              },
            },
          });
        },
      });
    } catch (e: any) {
      if (import.meta.env.VITE_ENVIRONMENT !== 'production') {
        console.error(e);
      }

      openWith({
        status: 'danger',
        description:
          e.message ??
          'Oops! Something went wrong. Totally our fault, but try again later.',
      });
    }
  };

  return { create, ...results };
}

export function useCustomRemoveRelationshipMutation(accountId: string) {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<
    IRemoveRelationshipArgs,
    {
      payload: RemoveRelationshipInput;
    }
  >(REMOVE_RELATIONSHIP);

  const remove = async (payload: RemoveRelationshipInput) => {
    try {
      return await mutate({
        variables: { payload },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              followers(current = {}, { readField }) {
                updateLists(current, readField, accountId, data);
              },
              following(current = {}, { readField }) {
                updateLists(current, readField, accountId, data);
              },
              relationshipCount(current = {}, { readField }) {
                const following = readField('following', current);

                if (!following) return current;

                return {
                  ...current,
                  following: (following as number) - 1,
                };
              },
            },
          });
        },
      });
    } catch (e: any) {
      if (import.meta.env.VITE_ENVIRONMENT !== 'production') {
        console.error(e);
      }

      openWith({
        status: 'danger',
        description:
          e.message ??
          'Oops! Something went wrong. Totally our fault, but try again later.',
      });
    }
  };

  return { remove, ...results };
}
