import { Heading, HStack } from '@holdr-ui/react';
import { Fragment } from 'react';
import { BackButton, Paths, prefix, Responsive } from '../../../shared';

function Header() {
  return (
    <Fragment>
      <HStack
        gap={3}
        w='100%'
        as='header'
        items='center'
        p={4}
        h={58}
        borderBottom={2}
        borderColor='base100'
        position='sticky'
        t={{ '@bp1': 0, '@bp3': 65 }}
        css={{
          backgroundColor: '#FFF',
          zIndex: 10,
        }}
      >
        <Responsive>
          <Responsive.Item mobile='show'>
            <BackButton fallbackPath={prefix('/', Paths.bookmarks)} />
          </Responsive.Item>
        </Responsive>
        <Heading as='h2' size={{ '@bp1': 3, '@bp3': 4 }}>
          All bookmarks
        </Heading>
      </HStack>
    </Fragment>
  );
}
Header.displayName = 'Header';

export default Header;
