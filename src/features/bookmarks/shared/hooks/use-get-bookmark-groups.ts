import { useSuspenseQuery } from '@apollo/client';
import { IConnection, IPaginationParams } from '../../../../shared';
import { IBookmarkGroup } from '../interface';
import { GET_BOOKMARK_GROUPS } from '../../queries';
import { SuspenseQueryHookFetchPolicy } from '@apollo/client/react/types/types';
import { omit } from 'lodash';

interface GetBookmarkGroupsInput {
  feedId?: string;
  params?: IPaginationParams<string>;
  queryText?: string;
}

interface GetBookmarkGroupsArgs extends GetBookmarkGroupsInput {
  fetchPolicy?: SuspenseQueryHookFetchPolicy;
}

export function useGetBookmarkGroups(data?: GetBookmarkGroupsArgs) {
  return useSuspenseQuery<
    { bookmarkGroups: IConnection<IBookmarkGroup, string> },
    {
      payload: GetBookmarkGroupsInput;
    }
  >(GET_BOOKMARK_GROUPS, {
    variables: { payload: omit(data, 'fetchPolicy') },
    fetchPolicy: data?.fetchPolicy,
  });
}
