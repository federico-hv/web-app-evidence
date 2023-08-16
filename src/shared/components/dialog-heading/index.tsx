import { Box, Heading, HStack } from '@holdr-ui/react';
import { DialogHeadingProps } from './types';

function DialogHeading({ id, title }: DialogHeadingProps) {
  return (
    <Box w='full' position='relative'>
      <HStack
        flex={1}
        items='center'
        ml={{ '@bp1': 0, '@bp3': -32 }}
        justify={{ '@bp1': 'flex-start', '@bp3': 'center' }}
        css={{ zIndex: -1 }}
      >
        <Heading
          id={id}
          as='h2'
          size={{ '@bp1': 3, '@bp3': 4 }}
          css={{ textAlign: 'center' }}
          casing='uppercase'
          weight={500}
        >
          {title}
        </Heading>
      </HStack>
    </Box>
  );
}
DialogHeading.displayName = 'DialogHeading';

export default DialogHeading;
