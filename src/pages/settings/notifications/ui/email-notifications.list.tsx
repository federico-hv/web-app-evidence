import {
  Box,
  Checkbox,
  HStack,
  Icon,
  Switch,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  checkboxFix,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';

function EmailNotificationsList() {
  return (
    <Box>
      <TextGroup>
        <TextGroupHeading size={3} weight={400}>
          Preferences
        </TextGroupHeading>
        <TextGroupSubheading size={2} weight={300} color='white700'>
          Select the notifications you want to receive via email
        </TextGroupSubheading>
      </TextGroup>
      <VStack
        border={1}
        borderColor='rgba(152, 152, 255, 0.1)'
        bgColor='rgba(48, 48, 75, 0.6)'
        py={5}
        px={4}
        radius={3}
        mt={4}
        gap={5}
        divider={
          <Box
            h='1px'
            w='full'
            bgColor='rgba(152, 152, 255, 0.05)
'
          />
        }
      >
        <HStack cursor='pointer' as='label' justify='space-between'>
          <VStack justify='space-between'>
            <TextGroupHeading
              id='2fa-connection'
              as='h5'
              size={3}
              weight={500}
            >
              Email Notifications
            </TextGroupHeading>
            <TextGroupSubheading size={2} weight={300} color='white700'>
              Enable email notifications and select the emails that you
              want to receive
            </TextGroupSubheading>
          </VStack>
          <Switch colorTheme='success400' />
        </HStack>
      </VStack>
    </Box>
  );
}
EmailNotificationsList.displayName = 'EmailNotificationsList';

export default EmailNotificationsList;
