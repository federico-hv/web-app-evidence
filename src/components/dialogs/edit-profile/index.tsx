import {
  Button,
  Dialog,
  FormControl,
  Heading,
  HStack,
  Input,
  Textarea,
  VStack,
} from '@holdr-ui/react';

function EditProfileDialog() {
  // when the dialog is opened change the url /settings/profile

  return (
    <Dialog ariaDescribedBy='edit-profile-modal__heading'>
      <Dialog.Trigger>
        <Button size={{ '@bp1': 'base', '@bp4': 'base' }} label='Edit' />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          h={{ '@bp1': '100vh', '@bp3': 550 }}
          maxHeight={{ '@bp1': '100vh', '@bp3': '85vh' }}
          radius={{ '@bp1': 0, '@bp3': 3 }}
          w={{ '@bp1': '100vw', '@bp3': '90vw' }}
        >
          <Dialog.Header>
            <HStack items='center' flex={1} justify='space-between'>
              <Heading as='h4'>Edit Profile</Heading>
              <Button>Save</Button>
            </HStack>
          </Dialog.Header>
          <Dialog.Body>
            <VStack>
              <FormControl>
                <FormControl.Label>Display Name</FormControl.Label>
                <Input type='text' />
              </FormControl>
              <FormControl>
                <FormControl.Label>Bio</FormControl.Label>
                <Textarea />
              </FormControl>
              <FormControl>
                <FormControl.Label>Spotify Url</FormControl.Label>
                <Input type='text' />
              </FormControl>
              <FormControl>
                <FormControl.Label>Apple Music Url</FormControl.Label>
                <Input type='text' />
              </FormControl>
              <FormControl>
                <FormControl.Label>Youtube Url</FormControl.Label>
                <Input type='text' />
              </FormControl>
            </VStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
EditProfileDialog.displayName = 'EditProfileDialog';

export default EditProfileDialog;
