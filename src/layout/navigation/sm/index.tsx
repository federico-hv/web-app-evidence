import { Fragment } from 'react';
import { Box, HStack } from '@holdr-ui/react';
import { GQLRenderer, Logo } from '../../../shared/components';
import ProfileDrawer from './profile.drawer';
import {
  useIsBottom,
  useScrollDirection,
  useScrollPosition,
} from '../../../shared';

function SmNavigation() {
  const { top } = useScrollPosition();
  const isBottom = useIsBottom();
  const { direction, delta } = useScrollDirection();

  return (
    <Box
      position='fixed'
      t={0}
      w='100%'
      css={{
        backgroundColor: '#FFF',
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
