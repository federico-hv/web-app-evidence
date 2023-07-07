import { Box } from '@holdr-ui/react';
import Head from '../head';
import { NotFoundContent } from '../../groups';

function NotFoundError() {
  return (
    <>
      <Head
        title='Page Not Found'
        description="We do not have what you're looking for."
      />
      <Box h={{ '@bp1': '100vh', '@bp3': 'calc(100vh - 65px)' }} w='100%'>
        <NotFoundContent />
      </Box>
    </>
  );
}
NotFoundError.displayName = 'NotFoundError';

export default NotFoundError;
