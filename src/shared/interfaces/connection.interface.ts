import { IEdge } from './edge.interface';
import { IPageInfo } from './page-info.interface';

export interface IConnection<T, U> {
  edges: IEdge<T, U>[];
  pageInfo: IPageInfo<U>;
}
