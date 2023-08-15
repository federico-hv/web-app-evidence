import { GenericProps } from '../../index';

export type ResponsiveSCNames = 'ResponsiveItem';

type visible = 'show' | 'hide';

export interface ResponsiveSCProps extends GenericProps {
  fullWidth?: boolean; // super cheat
  mobile?: visible;
  tablet?: visible;
  laptop?: visible;
  desktop?: visible;
}
