import { VStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';

export type PageLayoutSCNames = 'PageLayoutHeader' | 'PageLayoutContent';

export interface PageLayoutHeaderProps extends VStackProps {
  onBack?: VoidFunction;
}
