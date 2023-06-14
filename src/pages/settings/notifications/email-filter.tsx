import { Text, HStack, Switch, VStack, Heading } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { SettingCheckbox } from 'components';

function EmailFiltersSettingsPage() {
  return (
    <HeaderLayout title='Filters'>
      <HStack
        px={4}
        pb={4}
        borderBottom={2}
        borderColor='base100'
        justify='space-between'
        items='center'
      >
        <Text>Email notifications</Text>
        <Switch />
      </HStack>
      <VStack p={4} borderBottom={2} borderColor='base100'>
        <Heading as='h2' size={3} weight={600} css={{ fontSize: 'large' }}>
          Related to you
        </Heading>
        <VStack mt={4}>
          <SettingCheckbox disabled heading='New notifications' />
        </VStack>
      </VStack>
    </HeaderLayout>
  );
}
EmailFiltersSettingsPage.displayName = 'EmailFiltersSettingsPage';

export default EmailFiltersSettingsPage;
