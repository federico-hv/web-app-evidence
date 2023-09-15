import { GenericProps } from '../../interfaces';

export type PageLayoutSCNames = 'PageLayoutHeader' | 'PageLayoutContent';

export interface PageLayoutHeaderProps extends GenericProps {
  onBack?: VoidFunction;
}
