import { ReactNode } from 'react';
import { Heading, HStack, IconButton, VStack } from '@holdr-ui/react';
import { useNavigate } from 'react-router-dom';

// TODO Yeah, Imma deprecate the f*ck outta this. I dont like this piece of code at all.

function SettingsHeaderLayout({
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
    <VStack
      w='full'
      h='58px'
      borderBottom={1}
      borderColor='rgba(152, 152, 255, 0.10)'
    >
      <HStack minHeight='58px' flex={1} items='center' px={3} gap={4}>
        <IconButton
          icon='arrow-left-outline'
          ariaLabel='go back'
          variant='ghost'
          colorTheme='base400'
          onClick={goBack}
        />
        <Heading size={4} weight={500} css={{ fontSize: 'large' }}>
          {title}
        </Heading>
      </HStack>
      {children}
    </VStack>
  );
}
SettingsHeaderLayout.displayName = 'SettingsHeaderLayout';

export default SettingsHeaderLayout;
