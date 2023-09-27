import { Box, Heading } from '@holdr-ui/react';
import { Fragment } from 'react';

function Header() {
  return (
    <Fragment>
      <Box
        w='100%'
        as='header'
        p={4}
        h={58}
        borderBottom={2}
        borderColor='base100'
        position='sticky'
        t={65}
        css={{
          backgroundColor: '#FFF',
          zIndex: 10,
        }}
      >
        <Heading as='h2' size={4}>
          All bookmarks
        </Heading>
      </Box>
    </Fragment>
  );
}
Header.displayName = 'Header';

export default Header;
