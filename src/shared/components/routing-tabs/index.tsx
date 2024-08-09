import { getSubComponent } from '../../utilities';
import { Box, CSSTheme, HStack, Stack, VStack } from '@holdr-ui/react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  HStackProps,
  StackProps,
} from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import { GQLRenderer } from '../index';
import { ComponentType } from 'react';
import { FallbackProps } from 'react-error-boundary';

function RoutingTabs({ children, ...props }: BoxProps) {
  const TabsHeader = getSubComponent(children, 'RoutingTabsHeader');
  const TabsContent = getSubComponent(children, 'RoutingTabsContent');

  return (
    <VStack
      css={{
        transition: 'all 0.3s ease-in-out',
      }}
      {...props}
    >
      {TabsHeader}
      {TabsContent}
    </VStack>
  );
}
RoutingTabs.displayName = 'RoutingTabs';

function RoutingTabsHeader({ children, ...props }: HStackProps) {
  return (
    <HStack w='100%' {...props}>
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
  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const { pathname } = useLocation();

  const paths = pathname.split('/');

  const currentPath = paths[paths.length - 1];

  const active = to === currentPath;

  return (
    <Link to={to} state={state} onClick={handleClick}>
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

function RoutingTabsContent({
  children,
  Fallback,
  ...props
}: BoxProps & { Fallback?: ComponentType<FallbackProps> }) {
  //REMOVE THIS any, should be the context
  return (
    <Box {...props}>
      {children}
      <GQLRenderer ErrorFallback={Fallback}>
        <Outlet />
      </GQLRenderer>
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
