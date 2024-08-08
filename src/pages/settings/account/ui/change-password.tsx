import {
  Box,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  HStack,
  Icon,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';

function ChangePassword() {
  return (
    <Box>
      <TextGroup>
        <TextGroupHeading size={3} weight={400}>
          Change Your Password
        </TextGroupHeading>
        <TextGroupSubheading size={2} weight={300} color='white700'>
          Update your password at any time
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
      >
        <Dialog>
          <DialogTrigger>
            <HStack items='center' justify='space-between'>
              <Text>Change password</Text>
              <Icon name='caret-right-outline' />
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
ChangePassword.displayName = 'ChangePassword';

export default ChangePassword;
