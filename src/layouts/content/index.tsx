import { Box, HStack } from '@holdr-ui/react';
import { ReactNode } from 'react';
import { getSubComponent } from '../../utilities';

interface BaseContentLayoutProps {
  children?: ReactNode;
}
type ContentLayoutSCNames = 'ContentLayoutMain' | 'ContentLayoutAside';

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
      borderRight={2}
      borderColor='base100'
      px={5}
      py={4}
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
      px={5}
      py={4}
      css={{ '@bp1': { display: 'none' }, '@bp4': { display: 'block' } }}
    >
      <Box
        css={{ '@bp1': { display: 'none' }, '@bp5': { display: 'block' } }}
      >
        {children}
      </Box>
    </Box>
  );
};
ContentLayoutAside.displayName = 'ContentLayoutAside';

ContentLayout.Main = ContentLayoutMain;
ContentLayout.Aside = ContentLayoutAside;

export { ContentLayoutMain, ContentLayoutAside };
export default ContentLayout;
