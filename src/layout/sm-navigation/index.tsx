import { Fragment } from 'react';
import { Box, HStack } from '@holdr-ui/react';
import { GQLRenderer, Logo } from '../../shared/components';
import ProfileDrawer from './profile.drawer';
import { useScrollDirection } from '../../shared';

function SmNavigation() {
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
          display: direction === 'down' && delta > 0 ? 'none' : 'block',
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
