import { Fragment } from 'react';
import { Box, HStack } from '@holdr-ui/react';
import { GQLRenderer, Logo } from '../../shared/components';
import ProfileDrawer from './profile.drawer';
import {
  useIsBottomOf,
  useScrollDirection,
  useScrollPosition,
} from '../../shared';

function SmNavigation() {
  const { top } = useScrollPosition('#root');
  const isBottom = useIsBottomOf('#root');
  const { direction, delta } = useScrollDirection('#root');

  return (
    <Box
      position='fixed'
      t={0}
      w='100%'
      bgColor='clearTint500'
      css={{
        blur: '12px',
        zIndex: 50,
        '@bp1': {
          display:
            top >= 15 && !isBottom && direction === 'down' && delta > 0
              ? 'none'
              : 'block',
        },
      }}
    >
      <HStack
        px={4}
        pt={4}
        pb={2}
        as='header'
        justify='space-between'
        items='center'
        w='100%'
      >
        <Logo />

        <GQLRenderer
          ErrorFallback={() => <Fragment />}
          LoadingFallback={<Fragment />}
        >
          <ProfileDrawer />
        </GQLRenderer>
      </HStack>
    </Box>
  );
}

SmNavigation.displayName = 'SmNavigation';

export default SmNavigation;
