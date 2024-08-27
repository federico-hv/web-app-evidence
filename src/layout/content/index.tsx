import { Box, HStack, VStack } from '@holdr-ui/react';
import { getSubComponent } from '../../shared';
import { BaseContentLayoutProps, ContentLayoutSCNames } from './types';

function ContentLayout({ children }: BaseContentLayoutProps) {
  const Main = getSubComponent<ContentLayoutSCNames>(
    children,
    'ContentLayoutMain',
  );
  const Aside = getSubComponent<ContentLayoutSCNames>(
    children,
    'ContentLayoutAside',
  );

  return (
    <HStack h='full' w='full' gap={4}>
      {Main}
      {Aside}
    </HStack>
  );
}
ContentLayout.displayName = 'ContentLayout';

const ContentLayoutMain = ({
  children,
  innerRef,
}: BaseContentLayoutProps) => {
  return (
    <Box innerRef={innerRef} flex={1}>
      {children}
    </Box>
  );
};
ContentLayoutMain.displayName = 'ContentLayoutMain';

const ContentLayoutAside = ({
  children,
  hideScrollbar = false,
}: BaseContentLayoutProps) => {
  return (
    <Box
      as='aside'
      w={{ '@bp1': 0, '@bp6': 308 }}
      display={{ '@bp1': 'none', '@bp6': 'block' }}
      css={{ flexShrink: 0 }}
    >
      <Box h='calc(100% - 80px)' w='100%'>
        <VStack
          className={hideScrollbar ? 'hide-scrollbar' : 'thin-scrollbar'}
          overflow='auto'
          position='fixed'
          t={80}
          gap={4}
          h='calc(100% - 80px)'
          pb={4}
          w={{ '@bp1': 0, '@bp6': 308 }}
        >
          {children}
        </VStack>
      </Box>
    </Box>
  );
};
ContentLayoutAside.displayName = 'ContentLayoutAside';

ContentLayout.Main = ContentLayoutMain;
ContentLayout.Aside = ContentLayoutAside;

export { ContentLayoutMain, ContentLayoutAside };
export default ContentLayout;
