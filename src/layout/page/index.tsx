import { Box, HStack, VStack } from '@holdr-ui/react';
import { getSubComponent, BackButton } from '../../shared';
import { PageLayoutHeaderProps, PageLayoutSCNames } from './types';
import { VStackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';

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
  fallbackPath,
  css,
  ...props
}: PageLayoutHeaderProps) {
  return (
    <VStack
      position='sticky'
      t={{ '@bp1': 0, '@bp3': 65 }}
      bgColor='clearTint500'
      justify='center'
      p={{ '@bp1': 2, '@bp3': 4 }}
      borderBottom={2}
      borderColor='base100'
      h={58}
      zIndex={10}
      css={{
        blur: '12px',
        ...css,
      }}
      {...props}
    >
      <HStack items='center' gap={3}>
        <Box display={{ '@bp1': 'block', '@bp4': 'none' }}>
          <BackButton fallbackPath={fallbackPath} />
        </Box>
        <HStack
          items={'center'}
          justify='space-between'
          w='100%'
          fontSize={4}
          css={{
            fontSize: 'large',
            fontWeight: 500,
          }}
        >
          {children}
        </HStack>
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
