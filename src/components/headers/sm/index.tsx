import { Box, HStack, IconButton } from '@holdr-ui/react';
import { useGoBack } from 'hooks';

import { HeaderSmProps } from './header-sm.types';

function HeaderSm({ children }: HeaderSmProps) {
  const goBack = useGoBack();
  return (
    <Box
      zIndex={10}
      as='header'
      position='fixed'
      bgColor='clearTint500'
      t={0}
      l={0}
      h={50}
      w='100%'
      p={3}
    >
      <HStack gap={4} items='center'>
        <IconButton
          colorTheme='primary400'
          icon='arrow-left-outline'
          ariaLabel='go back'
          boxShadow='none'
          onClick={goBack}
        />
        <Box w='70%'>{children}</Box>
      </HStack>
    </Box>
  );
}
HeaderSm.displayName = 'HeaderSm';

export default HeaderSm;
