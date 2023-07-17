import { GenericProps } from '../../index';

export type ResponsiveSCNames = 'ResponsiveItem';

type visible = 'show' | 'hide';

export interface ResponsiveSCProps extends GenericProps {
  mobile?: visible;
  tablet?: visible;
  laptop?: visible;
  desktop?: visible;
}
