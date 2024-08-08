import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  HStack,
  VStack,
} from '@holdr-ui/react';
import {
  checkboxFix,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';

function SecuritySection() {
  return (
    <Box>
      <TextGroup>
        <TextGroupHeading size={3} weight={400}>
          Security
        </TextGroupHeading>
        <TextGroupSubheading size={2} weight={300} color='white700'>
          Manage your account security
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
        <TextGroup>
          <TextGroupHeading as='h5' size={3} weight={500}>
            Two-factor authentication
          </TextGroupHeading>
          <TextGroupSubheading size={2} weight={300} color='white700'>
            Enhance your account security by enabling two-factor
            authentication. In addition to your Holdr password, you can use
            a text message, authentication app, or security key for added
            protection against unauthorized access.
          </TextGroupSubheading>
          <TextGroupSubheading size={2} color='purple200'>
            Learn more
          </TextGroupSubheading>
        </TextGroup>
        <Dialog>
          <DialogTrigger>
            <HStack as='label' justify='space-between'>
              <VStack justify='space-between'>
                <TextGroupHeading
                  id='2fa-connection'
                  as='h5'
                  size={3}
                  weight={500}
                >
                  Connect authenticator app
                </TextGroupHeading>
                <TextGroupSubheading
                  size={2}
                  weight={300}
                  color='white700'
                >
                  Use a 2FA app to authenticate yourself on login and other
                  secure actions.
                </TextGroupSubheading>
              </VStack>
              <Checkbox
                size='sm'
                colorTheme='white500'
                labelledBy='2fa-connection'
                className={checkboxFix()}
              />
            </HStack>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              <DialogHeader>Header</DialogHeader>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </VStack>
    </Box>
  );
}
SecuritySection.displayName = 'SecuritySection';

export default SecuritySection;
