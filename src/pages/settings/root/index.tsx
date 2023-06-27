import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  VStack,
} from '@holdr-ui/react';
import { Head, SettingNavigationLink } from 'components';
import { Outlet, useLocation } from 'react-router-dom';
import { ShelfLayout } from 'layouts';
import { Paths, SettingsParentMap } from 'shared';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenuNavigate } from '../../../hooks';

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
        <Heading size={4} weight={500} css={{ fontSize: 'large' }}>
          {title}
        </Heading>
      </HStack>
    </VStack>
  );
}

export function SettingsSm() {
  const location = useLocation();
  const currentSetting = location.pathname.split('/')[2];
  const { goto } = useMenuNavigate();
  return (
    <Box
      display={{ '@bp4': 'none' }}
      pt={{ '@bp3': '67px' }}
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
            active={
              SettingsParentMap[currentSetting] === Paths.setting.account
            }
          />
          <SettingNavigationLink
            to={Paths.setting.security}
            label='Security and account access'
            active={
              SettingsParentMap[currentSetting] === Paths.setting.security
            }
          />
          <SettingNavigationLink
            to={Paths.setting.privacy}
            label='Privacy and safety'
            active={
              SettingsParentMap[currentSetting] === Paths.setting.privacy
            }
          />
          <SettingNavigationLink
            to={Paths.setting.notifications}
            label='Notifications'
            active={
              SettingsParentMap[currentSetting] ===
              Paths.setting.notifications
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
        <ShelfLayout.Shelf
          as='aside'
          h='100%'
          w={{
            '@bp4': 300,
            '@bp5': 350,
            // '@bp4': 375,
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
            active={
              SettingsParentMap[currentSetting] === Paths.setting.account
            }
          />
          <SettingNavigationLink
            to={Paths.setting.security}
            label='Security and account access'
            active={
              SettingsParentMap[currentSetting] === Paths.setting.security
            }
          />
          <SettingNavigationLink
            to={Paths.setting.privacy}
            label='Privacy and safety'
            active={
              SettingsParentMap[currentSetting] === Paths.setting.privacy
            }
          />
          <SettingNavigationLink
            to={Paths.setting.notifications}
            label='Notifications'
            active={
              SettingsParentMap[currentSetting] ===
              Paths.setting.notifications
            }
          />
        </ShelfLayout.Shelf>
        <ShelfLayout.Shelf
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
        </ShelfLayout.Shelf>
      </ShelfLayout>
    </Box>
  );
}

function SettingsPage() {
  return (
    <>
      <Head
        title='Settings'
        description='Configure your notifications, update your privacy settings, security settings and more.'
      />
      <SettingsSm />
      <SettingsLg />
    </>
  );
}
SettingsPage.displayName = 'SettingsPage';
export default SettingsPage;
