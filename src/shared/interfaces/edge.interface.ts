// T the type of the Item e.g. IFeed or IBookmark
// U the type of the id of an item e.g. number or string
export interface IEdge<T, U> {
  node: T; // the item
  cursor: U; // the cursor for the item
}
