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
      w='calc(100% - 375px)'
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
    <Box as='aside' w={375} px={5} py={4}>
      {children}
    </Box>
  );
};
ContentLayoutAside.displayName = 'ContentLayoutAside';

ContentLayout.Main = ContentLayoutMain;
ContentLayout.Aside = ContentLayoutAside;

export { ContentLayoutMain, ContentLayoutAside };
export default ContentLayout;
