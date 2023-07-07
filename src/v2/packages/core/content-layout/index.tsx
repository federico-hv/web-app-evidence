import { Box, HStack } from '@holdr-ui/react';
import { getSubComponent } from '../../common';
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
    <HStack h='full' w='full'>
      {Main}
      {Aside}
    </HStack>
  );
}
ContentLayout.displayName = 'ContentLayout';

const ContentLayoutMain = ({ children }: BaseContentLayoutProps) => {
  return (
    <Box
      as='main'
      w={{
        '@bp1': 'full',
        '@bp4': 'calc(100% - 160px)',
        '@bp5': 'calc(100% - 375px)',
      }}
      t={{ '@bp3': 65 }}
      borderRight={2}
      borderLeft={2}
      h='fit-content'
      minHeight='calc(100vh - 65px)'
      borderColor='base100'
      position='relative'
    >
      {children}
    </Box>
  );
};
ContentLayoutMain.displayName = 'ContentLayoutMain';

const ContentLayoutAside = ({ children }: BaseContentLayoutProps) => {
  return (
    <Box
      as='aside'
      w={{ '@bp1': 0, '@bp4': 160, '@bp5': 375 }}
      css={{ '@bp1': { display: 'none' }, '@bp4': { display: 'block' } }}
    >
      <Box
        position='fixed'
        t={65}
        css={{ '@bp1': { display: 'none' }, '@bp5': { display: 'block' } }}
      >
        <Box p={4} w={{ '@bp1': 0, '@bp4': 160, '@bp5': 375 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
ContentLayoutAside.displayName = 'ContentLayoutAside';

ContentLayout.Main = ContentLayoutMain;
ContentLayout.Aside = ContentLayoutAside;

export { ContentLayoutMain, ContentLayoutAside };
export default ContentLayout;
