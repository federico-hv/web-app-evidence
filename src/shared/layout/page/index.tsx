import { GenericProps } from '../../interfaces';
import { Box, HStack, IconButton, VStack } from '@holdr-ui/react';
import { getSubComponent } from '../../utilities';
import { PageLayoutHeaderProps, PageLayoutSCNames } from './types';

function PageLayout({ children }: GenericProps) {
  const Header = getSubComponent<PageLayoutSCNames>(
    children,
    'PageLayoutHeader',
  );
  const Content = getSubComponent<PageLayoutSCNames>(
    children,
    'PageLayoutContent',
  );

  return (
    <VStack>
      {Header}
      {Content}
    </VStack>
  );
}
PageLayout.displayName = 'Page Layout';

function PageLayoutHeader({ children, onBack }: PageLayoutHeaderProps) {
  return (
    <VStack
      justify='center'
      p={4}
      borderBottom={2}
      borderColor='base100'
      h={58}
    >
      <HStack items='center' gap={4}>
        {onBack && (
          <Box display={{ '@bp4': 'none' }}>
            <IconButton
              variant='ghost'
              icon='arrow-left-outline'
              ariaLabel='go back'
              onClick={onBack}
            />
          </Box>
        )}
        <Box
          w='100%'
          fontSize={4}
          css={{ fontSize: 'large', fontWeight: 500 }}
        >
          {children}
        </Box>
      </HStack>
    </VStack>
  );
}
PageLayoutHeader.displayName = 'PageLayoutHeader';

function PageLayoutContent({ children }: GenericProps) {
  return <Box w='100%'>{children}</Box>;
}
PageLayoutContent.displayName = 'PageLayoutContent';

PageLayout.Header = PageLayoutHeader;
PageLayout.Content = PageLayoutContent;

export { PageLayoutContent, PageLayoutHeader };

export default PageLayout;
