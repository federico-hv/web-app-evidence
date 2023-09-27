import { IBookmarkGroup, ICreateBookmarkGroup } from '../../features';

export const CreateBookmarkGroupValues: ICreateBookmarkGroup = {
  name: '',
  isPrivate: true,
};

export const AllBookmarkGroups: IBookmarkGroup = {
  id: 'all',
  name: 'All bookmarks',
  total: 0,
  private: true,
};
