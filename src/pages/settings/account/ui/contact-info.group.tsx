import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  HStack,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import {
  CountryPicker,
  InputTextField,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';

function ChangeEmailAddress() {
  const disclosure = useDisclosure();
  return (
    <Dialog {...disclosure}>
      <DialogTrigger>
        <Box position='relative'>
          <Box
            zIndex={2}
            onClick={disclosure.onOpen}
            position='absolute'
            t={0}
            l={0}
            b={0}
            w='100%'
          />
          <InputTextField disabled label='Email' name='email' />
        </Box>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent w='400px'>
          <DialogHeader>Change Email</DialogHeader>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

function ChangePhoneNumber() {
  const disclosure = useDisclosure();
  return (
    <Dialog {...disclosure}>
      <DialogTrigger>
        <Box position='relative'>
          <Box
            zIndex={2}
            onClick={disclosure.onOpen}
            position='absolute'
            t={0}
            l={0}
            b={0}
            w='100%'
          />
          <InputTextField
            disabled
            label='Phone number'
            name='phoneNumber'
          />
        </Box>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent w='400px'>
          <DialogHeader>Change Phone Number</DialogHeader>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

function ContactInfoGroup() {
  return (
    <Box>
      <TextGroup>
        <TextGroupHeading size={3} weight={400}>
          Contact Information
        </TextGroupHeading>
        <TextGroupSubheading size={2} weight={300} color='white700'>
          Update your email address or phone number
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
        <ChangePhoneNumber />
        <ChangeEmailAddress />
      </VStack>
    </Box>
  );
}
ContactInfoGroup.displayName = 'ContactInfoGroup';

export default ContactInfoGroup;
