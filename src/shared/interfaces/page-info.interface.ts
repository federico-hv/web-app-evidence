export interface IPageInfo<T> {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startCursor: T | null;
  endCursor: T | null;
}
