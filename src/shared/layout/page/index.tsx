import { Box, HStack, VStack } from '@holdr-ui/react';
import { getSubComponent } from '../../utilities';
import { PageLayoutHeaderProps, PageLayoutSCNames } from './types';
import { VStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import { BackButton } from '../../components';

function PageLayout({ children, ...props }: VStackProps) {
  const Header = getSubComponent<PageLayoutSCNames>(
    children,
    'PageLayoutHeader',
  );
  const Content = getSubComponent<PageLayoutSCNames>(
    children,
    'PageLayoutContent',
  );

  return (
    <VStack {...props}>
      {Header}
      {Content}
    </VStack>
  );
}
PageLayout.displayName = 'Page Layout';

function PageLayoutHeader({
  children,
  onBack,
  ...props
}: PageLayoutHeaderProps) {
  return (
    <VStack
      justify='center'
      p={4}
      borderBottom={2}
      borderColor='base100'
      h={58}
      {...props}
    >
      <HStack items='center' gap={4}>
        {onBack && (
          <Box display={{ '@bp4': 'none' }}>
            <BackButton />
          </Box>
        )}
        <Box
          w='100%'
          fontSize={4}
          css={{
            fontSize: 'large',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
        >
          {children}
        </Box>
      </HStack>
    </VStack>
  );
}
PageLayoutHeader.displayName = 'PageLayoutHeader';

function PageLayoutContent({ children, ...props }: BoxProps) {
  return (
    <Box w='100%' {...props}>
      {children}
    </Box>
  );
}
PageLayoutContent.displayName = 'PageLayoutContent';

PageLayout.Header = PageLayoutHeader;
PageLayout.Content = PageLayoutContent;

export { PageLayoutContent, PageLayoutHeader };

export default PageLayout;
