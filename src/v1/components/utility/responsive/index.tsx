import { GenericProps } from '../../../shared';
import { Box } from '@holdr-ui/react';
import { ResponsiveSCNames, ResponsiveSCProps } from './types';
import { getSubComponent } from '../../../utilities';
import SwitchConditional, {
  SwitchConditionalCase,
} from '../switch-conditional';

function Responsive({ children }: GenericProps) {
  const Items = getSubComponent<ResponsiveSCNames>(
    children,
    'ResponsiveItem',
  );

  return <>{Items}</>;
}
Responsive.displayName = 'Responsive';

const ResponsiveItem = ({
  children,
  laptop,
  mobile,
  tablet,
  desktop,
}: ResponsiveSCProps) => {
  return (
    <SwitchConditional>
      <SwitchConditionalCase on={!!mobile}>
        <Box
          display={
            mobile === 'show'
              ? { '@bp1': 'block', '@bp2': 'none' }
              : { '@bp1': 'none', '@bp2': 'block' }
          }
        >
          {children}
        </Box>
      </SwitchConditionalCase>
      <SwitchConditionalCase on={!!tablet}>
        <Box
          display={
            mobile === 'show'
              ? { '@bp1': 'none', '@bp2': 'block', '@bp4': 'none' }
              : { '@bp1': 'none', '@bp2': 'none', '@bp4': 'block' }
          }
        >
          {children}
        </Box>
      </SwitchConditionalCase>
      <SwitchConditionalCase on={!!laptop}>
        <Box
          display={
            mobile === 'show'
              ? { '@bp1': 'none', '@bp5': 'block', '@bp6': 'none' }
              : { '@bp1': 'none', '@bp5': 'none', '@bp6': 'block' }
          }
        >
          {children}
        </Box>
      </SwitchConditionalCase>
      <SwitchConditionalCase on={!!desktop}>
        <Box
          display={
            mobile === 'show'
              ? { '@bp1': 'none', '@bp7': 'block', '@bp8': 'none' }
              : { '@bp1': 'none', '@bp7': 'none', '@bp8': 'block' }
          }
        >
          {children}
        </Box>
      </SwitchConditionalCase>
    </SwitchConditional>
  );
};
ResponsiveItem.displayName = 'ResponsiveItem';

Responsive.Item = ResponsiveItem;

export { ResponsiveItem };

export default Responsive;
