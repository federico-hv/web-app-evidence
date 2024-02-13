import { Box, Heading, HStack } from '@holdr-ui/react';
import { DialogHeadingProps } from './types';

//TODO deprecate
function DialogHeading({ id, title }: DialogHeadingProps) {
  return (
    <Box w='full' position='relative' css={{ zIndex: -1 }}>
      <HStack
        w='calc(100% - 32)'
        items='center'
        ml={{ '@bp1': 0, '@bp3': -32 }}
        justify={{ '@bp1': 'flex-start', '@bp3': 'center' }}
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
