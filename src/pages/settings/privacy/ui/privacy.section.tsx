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

function PrivacySection() {
  return (
    <Box>
      <TextGroup>
        <TextGroupHeading size={3} weight={400}>
          Privacy
        </TextGroupHeading>
        <TextGroupSubheading size={2} weight={300} color='white700'>
          Manage what you can see and what others can see about you
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
              Protect account
            </TextGroupHeading>
            <TextGroupSubheading size={2} weight={300} color='white700'>
              Manage who can view your account and content
            </TextGroupSubheading>
          </VStack>
          <Checkbox
            size='sm'
            colorTheme='white500'
            labelledBy='2fa-connection'
            className={checkboxFix()}
          />
        </HStack>

        <VStack>
          <HStack py={2} pl={3} items='center' justify='space-between'>
            <Text py={2} weight={500}>
              Blocked accounts
            </Text>
            <Icon name='caret-right-outline' />
          </HStack>
          <HStack py={2} pl={3} items='center' justify='space-between'>
            <Text py={2} weight={500}>
              Muted accounts
            </Text>
            <Icon name='caret-right-outline' />
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}
PrivacySection.displayName = 'PrivacySection';

export default PrivacySection;
