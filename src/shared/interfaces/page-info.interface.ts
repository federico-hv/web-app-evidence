// T the type of the items id/cursor e.g. number or string
export interface IPageInfo<T> {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startCursor: T | null;
  endCursor: T | null;
}
