import { Box, Heading } from '@holdr-ui/react';
import { Head } from 'components';

function NotFoundPage() {
  return (
    <>
      <Head
        title='Page Not Found'
        description="We do not have what you're looking for."
      />
      <Box>
        <Heading as='h1'>Page Not Found</Heading>
      </Box>
    </>
  );
}
NotFoundPage.displayName = 'NotFoundPage';

export default NotFoundPage;
