import { Box, Text } from '@holdr-ui/react';
import { Head } from 'components';

function SettingsPage() {
  return (
    <>
      <Head
        title='Settings'
        description='Configure your notifications, update your privacy settings, security settings and more.'
      />
      <Box>
        <Text role='contentinfo'>Settings page</Text>
      </Box>
    </>
  );
}
SettingsPage.displayName = 'SettingsPage';
export default SettingsPage;
