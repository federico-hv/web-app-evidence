import { ReactNode } from 'react';
import { Heading, HStack, IconButton, VStack } from '@holdr-ui/react';
import { useNavigate } from 'react-router-dom';

function HeaderLayout({
  children,
  title,
  backLink,
}: {
  children?: ReactNode;
  title: string;
  backLink?: string;
}) {
  const navigate = useNavigate();

  const goBack = () => {
    if (backLink) navigate(backLink);
  };

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
