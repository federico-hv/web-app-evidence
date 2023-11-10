import { IEdge } from './edge.interface';
import { IPageInfo } from './page-info.interface';

// T the type of the Item e.g. IFeed or IBookmark
// U the type of the id of an item e.g. number or string
export interface IConnection<T, U> {
  edges: IEdge<T, U>[]; // an edge contains the list of items and associated cursors for each item.
  pageInfo: IPageInfo<U>; // contains details about next and previous pages and cursors.
}
