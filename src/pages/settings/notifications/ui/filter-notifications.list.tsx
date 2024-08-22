import {
  Box,
  Checkbox,
  HStack,
  Icon,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  checkboxFix,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';

function FilterNotificationsList() {
  return (
    <Box>
      <TextGroup>
        <TextGroupHeading size={3} weight={400}>
          Filtered Notifications
        </TextGroupHeading>
        <TextGroupSubheading size={2} weight={300} color='white700'>
          Filter your notifications based on your preferences
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
              Muted Notifications
            </TextGroupHeading>
            <TextGroupSubheading size={2} weight={300} color='white700'>
              Mute notifications based on your preferences
            </TextGroupSubheading>
          </VStack>
        </HStack>

        <VStack gap={4}>
          <HStack
            p={2}
            cursor='pointer'
            as='label'
            justify='space-between'
          >
            <Text id='filter-by-not-followers'>
              People who don’t follow you
            </Text>
            <Checkbox
              size='sm'
              colorTheme='white500'
              labelledBy='filter-by-not-followers'
              className={checkboxFix()}
            />
          </HStack>
          <HStack
            p={2}
            cursor='pointer'
            as='label'
            justify='space-between'
          >
            <Text id='filter-by-email-verif'>
              People who haven’t verified their email
            </Text>
            <Checkbox
              size='sm'
              colorTheme='white500'
              labelledBy='filter-by-email-verif'
              className={checkboxFix()}
            />
          </HStack>
          <HStack
            p={2}
            cursor='pointer'
            as='label'
            justify='space-between'
          >
            <Text id='filter-by-phone-verif'>
              People who haven’t verified their phone number
            </Text>
            <Checkbox
              size='sm'
              colorTheme='white500'
              labelledBy='filter-by-phone-verif'
              className={checkboxFix()}
            />
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}
FilterNotificationsList.displayName = 'FilterNotificationsList';

export default FilterNotificationsList;
