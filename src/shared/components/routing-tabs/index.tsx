import { getSubComponent } from '../../utilities';
import { Box, CSSTheme, HStack, Stack } from '@holdr-ui/react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  HStackProps,
  StackProps,
} from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';

function RoutingTabs({ children, ...props }: BoxProps) {
  const TabsHeader = getSubComponent(children, 'RoutingTabsHeader');
  const TabsContent = getSubComponent(children, 'RoutingTabsContent');

  return (
    <Box
      css={{
        transition: 'all 0.3s ease-in-out',
      }}
      {...props}
    >
      {TabsHeader}
      {TabsContent}
    </Box>
  );
}
RoutingTabs.displayName = 'RoutingTabs';

function RoutingTabsHeader({ children, ...props }: HStackProps) {
  return (
    <HStack w='100%' h='100%' {...props}>
      {children}
    </HStack>
  );
}
RoutingTabsHeader.displayName = 'RoutingTabsHeader';

function RoutingTabsList({ children, ...props }: HStackProps) {
  const TabsTrigger = getSubComponent(children, 'RoutingTabsTrigger');

  return (
    <HStack h='100%' w='100%' {...props}>
      {TabsTrigger}
    </HStack>
  );
}
RoutingTabsList.displayName = 'RoutingTabsList';

function RoutingTabsTrigger({
  children,
  to,
  css,
  onClick,
  state,
  _inactive = {
    borderBottom: 'none',
    fontWeight: 300,
  },
  _active = {
    borderBottom: '2px solid $purple500',
    fontWeight: 500,
  },
  // flex = 1,
  ...props
}: StackProps & {
  to: string;
  state?: any;
  _inactive?: CSSTheme;
  _active?: CSSTheme;
}) {
  const { pathname } = useLocation();

  const paths = pathname.split('/');

  const currentPath = paths[paths.length - 1];

  const active = to === currentPath;

  return (
    <Link to={to} state={state}>
      <Stack
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
        data-state={active ? 'active' : 'inactive'}
        w='100%'
        justify='center'
        items='center'
        cursor='pointer'
        overflow='hidden'
        {...props}
        css={{
          '&[data-state="active"]': {
            ..._active,
          },
          '&[data-state="inactive"]': {
            ..._inactive,
          },
          userSelect: 'none',
          ...css,
        }}
      >
        {children}
      </Stack>
    </Link>
  );
}
RoutingTabsTrigger.displayName = 'RoutingTabsTrigger';

function RoutingTabsContent({ children, ...props }: BoxProps) {
  return (
    <Box {...props}>
      {children}
      <Outlet />
    </Box>
  );
}
RoutingTabsContent.displayName = 'RoutingTabsContent';

RoutingTabs.Header = RoutingTabsHeader;
RoutingTabs.List = RoutingTabsList;
RoutingTabs.Trigger = RoutingTabsTrigger;
RoutingTabs.Content = RoutingTabsContent;

export {
  RoutingTabsContent,
  RoutingTabsTrigger,
  RoutingTabsList,
  RoutingTabsHeader,
};
export default RoutingTabs;
