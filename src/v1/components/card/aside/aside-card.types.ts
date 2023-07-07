import { StringNumeric } from '../../../shared';

export interface AsideCardProps {
  title: string;
  data: Array<any>;
  renderItem: (item: any, id: StringNumeric) => JSX.Element;
  keyExtractor: (item: any) => StringNumeric;
  path: string;
}
