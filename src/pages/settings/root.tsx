import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  StackDivider,
  useWindowSize,
  VStack,
} from '@holdr-ui/react';
import {
  BackButton,
  GQLRenderer,
  Head,
  Paths,
  prefix,
  RadialSurface,
  RootSetting,
} from '../../shared';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  ShelfLayout,
  ShelfLayoutShelf,
} from '../../layout';
import { BookmarkGroupsList } from '../bookmarks/ui';

/**
 * TODO: Deprecate, use a component that wraps a page with settings-header and body SCs
 */
export function PageHeader({
  title,
  onBack,
}: {
  title: string;
  onBack?: VoidFunction;
}) {
  return (
    <VStack
      justify='center'
      px={4}
      py={4}
      borderBottom={2}
      borderColor='base100'
      maxHeight={58}
    >
      <HStack items='center' gap={4}>
        {onBack && (
          <Box display={{ '@bp4': 'none' }}>
            <BackButton fallbackPath={prefix('/', Paths.settings)} />
          </Box>
        )}
        <Heading
          casing='uppercase'
          size={{ '@bp1': 3, '@bp3': 4 }}
          weight={500}
        >
          {title}
        </Heading>
      </HStack>
    </VStack>
  );
}

function SettingNavigationLink({
  active,
  label,
  to,
}: {
  active?: boolean;
  label: string;
  to: string;
}) {
  return (
    <Link to={to}>
      <HStack
        fontSize={{ '@bp1': 2, '@bp3': 3 }}
        justify='space-between'
        p={4}
        bgColor={active ? 'base100' : 'transparent'}
        _hover={{ backgroundColor: '$base100' }}
        borderLeft={active ? 2 : 0}
        borderColor='base600'
      >
        {label}
        <Icon name='caret-right-outline' />
      </HStack>
    </Link>
  );
}

export function SettingsSm() {
  const location = useLocation();
  const currentSetting = location.pathname.split('/')[2];

  return (
    <Box
      display={{ '@bp4': 'none' }}
      borderLeft={2}
      borderColor='base100'
      h='100vh'
    >
      {!currentSetting && (
        <>
          <PageLayout>
            <PageLayoutHeader>Settings</PageLayoutHeader>
            <PageLayoutContent>
              <SettingNavigationLink
                to={Paths.setting.account}
                label='Your account'
                active={
                  RootSetting[currentSetting] === Paths.setting.account
                }
              />
              <SettingNavigationLink
                to={Paths.setting.security}
                label='Security and account access'
                active={
                  RootSetting[currentSetting] === Paths.setting.security
                }
              />
              <SettingNavigationLink
                to={Paths.setting.privacy}
                label='Privacy and safety'
                active={
                  RootSetting[currentSetting] === Paths.setting.privacy
                }
              />
              <SettingNavigationLink
                to={Paths.setting.notifications}
                label='Notifications'
                active={
                  RootSetting[currentSetting] ===
                  Paths.setting.notifications
                }
              />
            </PageLayoutContent>
          </PageLayout>
        </>
      )}
      <Outlet />
    </Box>
  );
}

export function SettingsLg() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentSetting = location.pathname.split('/')[2];

  useEffect(() => {
    // should only happen in the case of the large screens
    if (!currentSetting) {
      navigate(Paths.setting.account, { replace: true });
    }
  }, [currentSetting, navigate]);

  // <RadialSurface
  //   divider={
  //     <StackDivider width={1} color='rgba(152, 152, 255, 0.10)' />
  //   }
  //   w='100%'
  //   radius={3}
  //   gap={6}
  // >
  //   <HStack px={6} pt={6} justify='space-between' items='center'>
  //     <Heading weight={400} size={6}>
  //       Bookmarks
  //     </Heading>
  //     <IconButton
  //       colorTheme='purple100'
  //       icon='add'
  //       ariaLabel='add bookmark'
  //     />
  //   </HStack>
  //   <HStack px={6} pb={6} gap={4} w='100%' h='calc(100% - 52px)'>
  //     <VStack
  //       border={1}
  //       borderColor='rgba(152, 152, 255, 0.10)'
  //       radius={2}
  //       bgColor='rgba(48, 48, 75, 0.60)'
  //       h='100%'
  //       basis={325}
  //     >
  //       <Box
  //         borderBottom={1}
  //         borderColor='rgba(152, 152, 255, 0.10)'
  //         pb={3}
  //       >
  //         <Heading color='white600' px={3} pt={3} size={4} weight={500}>
  //           My Groups
  //         </Heading>
  //       </Box>
  //       <GQLRenderer>
  //         <BookmarkGroupsList />
  //       </GQLRenderer>
  //     </VStack>
  //     <Box
  //       border={1}
  //       borderColor='rgba(152, 152, 255, 0.10)'
  //       radius={2}
  //       bgColor='rgba(48, 48, 75, 0.60)'
  //       h='100%'
  //       flex={1}
  //     >
  //       {/*<Outlet />*/}
  //     </Box>
  //   </HStack>
  // </RadialSurface>

  return (
    <Box display={{ '@bp1': 'none', '@bp4': 'block' }}>
      <ShelfLayout>
        <ShelfLayoutShelf
          as='aside'
          h='100%'
          w={{
            '@bp4': 300,
            '@bp5': 350,
          }}
          borderRight={2}
          borderColor='base100'
        >
          <PageLayout>
            <PageLayoutHeader fallbackPath={'/'}>
              Settings
            </PageLayoutHeader>
            <PageLayoutContent>
              <SettingNavigationLink
                to={Paths.setting.account}
                label='Your account'
                active={
                  RootSetting[currentSetting] === Paths.setting.account
                }
              />
              <SettingNavigationLink
                to={Paths.setting.security}
                label='Security and account access'
                active={
                  RootSetting[currentSetting] === Paths.setting.security
                }
              />
              <SettingNavigationLink
                to={Paths.setting.privacy}
                label='Privacy and safety'
                active={
                  RootSetting[currentSetting] === Paths.setting.privacy
                }
              />
              <SettingNavigationLink
                to={Paths.setting.notifications}
                label='Notifications'
                active={
                  RootSetting[currentSetting] ===
                  Paths.setting.notifications
                }
              />
            </PageLayoutContent>
          </PageLayout>
        </ShelfLayoutShelf>
        <ShelfLayoutShelf
          role='contentinfo'
          w={{
            '@bp4': 'calc(100% - 250px)',
            '@bp5': 'calc(100% - 500px)',
            // '@bp5': 'calc(100% - 525px)',
          }}
          borderRight={2}
          borderColor='base100'
        >
          <Outlet />
        </ShelfLayoutShelf>
      </ShelfLayout>
    </Box>
  );
}

function SettingsPage() {
  const windowSize = useWindowSize();

  // TODO: Remove SettingsSm and SettingsLg components. Refer to pages/bookmarks/edit-profile.button.tsx for pattern.

  return (
    <Box>
      <Head
        title='Settings'
        description='Configure your notifications, update your privacy settings, security settings and more.'
      />
      {windowSize && windowSize.width && windowSize.width <= 768 && (
        <SettingsSm />
      )}
      {windowSize && windowSize.width && windowSize.width > 768 && (
        <SettingsLg />
      )}
    </Box>
  );
}
SettingsPage.displayName = 'SettingsPage';
export default SettingsPage;
