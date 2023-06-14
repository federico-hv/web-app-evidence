import { ReactNode } from 'react';
import { useGoBack } from '../../hooks';
import { Heading, HStack, IconButton, VStack } from '@holdr-ui/react';

function HeaderLayout({
  children,
  title,
}: {
  children?: ReactNode;
  title: string;
  backLink?: string;
}) {
  const goBack = useGoBack();

  return (
    <VStack w='full'>
      <HStack flex={1} items='center' py={4} px={3} gap={4}>
        <IconButton
          icon='arrow-left-outline'
          ariaLabel='go back'
          variant='ghost'
          colorTheme='base400'
          onClick={goBack}
        />
        <Heading size={3} weight={500} css={{ fontSize: 'medium' }}>
          {title}
        </Heading>
      </HStack>
      {children}
    </VStack>
  );
}
HeaderLayout.displayName = 'HeaderLayout';

export default HeaderLayout;
