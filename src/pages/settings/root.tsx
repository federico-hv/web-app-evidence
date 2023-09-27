import {
  Box,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  useWindowSize,
  VStack,
} from '@holdr-ui/react';
import {
  BackButton,
  Head,
  Paths,
  RootSetting,
  ShelfLayout,
  ShelfLayoutShelf,
  useMenuNavigate,
} from '../../shared';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * TODO: Deprecate, use a component that wraps a page with header and body SCs
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
            <BackButton />
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
  const { goto } = useMenuNavigate();
  return (
    <Box
      display={{ '@bp4': 'none' }}
      borderLeft={2}
      borderColor='base100'
      h='100vh'
    >
      {!currentSetting && (
        <>
          <PageHeader title='Settings' onBack={goto.home} />
          <SettingNavigationLink
            to={Paths.setting.account}
            label='Your account'
            active={RootSetting[currentSetting] === Paths.setting.account}
          />
          <SettingNavigationLink
            to={Paths.setting.security}
            label='Security and account access'
            active={RootSetting[currentSetting] === Paths.setting.security}
          />
          <SettingNavigationLink
            to={Paths.setting.privacy}
            label='Privacy and safety'
            active={RootSetting[currentSetting] === Paths.setting.privacy}
          />
          <SettingNavigationLink
            to={Paths.setting.notifications}
            label='Notifications'
            active={
              RootSetting[currentSetting] === Paths.setting.notifications
            }
          />
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
          <PageHeader title='Settings' />
          <Box px={4} py={4} borderBottom={2} borderColor='base100'>
            <InputGroup radius='full'>
              <InputGroup.LeftElement>
                <Icon name='search-outline' />
              </InputGroup.LeftElement>
              <Input placeholder='Search settings' />
            </InputGroup>
          </Box>
          <SettingNavigationLink
            to={Paths.setting.account}
            label='Your account'
            active={RootSetting[currentSetting] === Paths.setting.account}
          />
          <SettingNavigationLink
            to={Paths.setting.security}
            label='Security and account access'
            active={RootSetting[currentSetting] === Paths.setting.security}
          />
          <SettingNavigationLink
            to={Paths.setting.privacy}
            label='Privacy and safety'
            active={RootSetting[currentSetting] === Paths.setting.privacy}
          />
          <SettingNavigationLink
            to={Paths.setting.notifications}
            label='Notifications'
            active={
              RootSetting[currentSetting] === Paths.setting.notifications
            }
          />
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
