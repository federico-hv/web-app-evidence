import { useEffect } from 'react';
import { Heading, VStack } from '@holdr-ui/react';
import { Head, SettingNavigationLink } from 'components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ShelfLayout } from 'layouts';
import { Paths } from 'shared';

export function PageHeader({ title }: { title: string }) {
  return (
    <VStack
      justify='center'
      px={4}
      py={2}
      borderBottom={2}
      borderColor='base100'
      h={60}
    >
      <Heading size={3} weight={500} css={{ fontSize: 'medium' }}>
        {title}
      </Heading>
    </VStack>
  );
}

function SettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentSetting = location.pathname.split('/')[2];

  useEffect(() => {
    if (!currentSetting) {
      navigate(Paths.setting.account, { replace: true });
    }
  }, [currentSetting, navigate]);

  return (
    <>
      <Head
        title='Settings'
        description='Configure your notifications, update your privacy settings, security settings and more.'
      />
      <ShelfLayout>
        <ShelfLayout.Shelf
          as='aside'
          h='100%'
          w={375}
          borderRight={2}
          borderColor='base100'
        >
          <PageHeader title='Settings' />
          <SettingNavigationLink
            to={Paths.setting.account}
            label='Your account'
            active={currentSetting === Paths.setting.account}
          />
          <SettingNavigationLink
            to={Paths.setting.security}
            label='Security and account access'
            active={currentSetting === Paths.setting.security}
          />
          <SettingNavigationLink
            to={Paths.setting.privacy}
            label='Privacy and safety'
            active={currentSetting === Paths.setting.privacy}
          />
          <SettingNavigationLink
            to={Paths.setting.notifications}
            label='Notifications'
            active={currentSetting === Paths.setting.notifications}
          />
        </ShelfLayout.Shelf>
        <ShelfLayout.Shelf
          role='contentinfo'
          w='calc(100% - 525px)'
          borderRight={2}
          borderColor='base100'
        >
          <Outlet />
        </ShelfLayout.Shelf>
      </ShelfLayout>
    </>
  );
}
SettingsPage.displayName = 'SettingsPage';
export default SettingsPage;
