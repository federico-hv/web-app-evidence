import { Box } from '@holdr-ui/react';
import { ResponsiveSCNames, ResponsiveSCProps } from './types';
import { GenericProps, getSubComponent } from '../../common';
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
              ? { '@bp1': 'block', '@bp3': 'none' }
              : { '@bp1': 'none', '@bp3': 'block' }
          }
        >
          {children}
        </Box>
      </SwitchConditionalCase>
      <SwitchConditionalCase on={!!tablet}>
        <Box
          display={
            tablet === 'show'
              ? { '@bp1': 'none', '@bp3': 'block', '@bp5': 'none' }
              : { '@bp1': 'none', '@bp3': 'none', '@bp5': 'block' }
          }
        >
          {children}
        </Box>
      </SwitchConditionalCase>
      <SwitchConditionalCase on={!!laptop}>
        <Box
          display={
            laptop === 'show'
              ? { '@bp1': 'none', '@bp5': 'block', '@bp7': 'none' }
              : { '@bp1': 'none', '@bp5': 'none', '@bp7': 'block' }
          }
        >
          {children}
        </Box>
      </SwitchConditionalCase>
      <SwitchConditionalCase on={!!desktop}>
        <Box
          display={
            desktop === 'show'
              ? { '@bp1': 'none', '@bp7': 'block' }
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
