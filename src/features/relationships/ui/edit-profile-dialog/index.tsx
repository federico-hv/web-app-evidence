import {
  Box,
  Button,
  Dialog,
  Heading,
  HStack,
  useSwitch,
} from '@holdr-ui/react';
import { Error, Loader, useProfile } from '../../../../shared';
import { parseToProfileFormData, useEditProfile } from '../../shared';
import ProfileForm from '../edit-profile-form';

function EditProfileButton() {
  const { switchState, turnOff, turnOn } = useSwitch(false);
  const { profile } = useProfile();
  const { loading, error, onSubmit, onFinish } = useEditProfile();

  return (
    <Dialog
      isOpen={switchState}
      onOpen={turnOn}
      onClose={turnOff}
      ariaDescribedBy='edit-profile-dialog__heading'
    >
      <Dialog.Trigger>
        <Button size={{ '@bp1': 'base', '@bp4': 'base' }} label='Edit' />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          // position='relative'
          t={{ '@bp1': 69, '@bp3': '50%' }}
          h={{ '@bp1': '100vh', '@bp3': 650 }}
          maxHeight={{ '@bp1': '100vh', '@bp3': '85vh' }}
          radius={{ '@bp1': 0, '@bp3': 3 }}
          w={{ '@bp1': '100vw', '@bp3': '90vw' }}
        >
          <Dialog.Header borderBottom={2} borderColor='base100'>
            <Box w='full' position='relative'>
              <HStack
                flex={1}
                items='center'
                ml={{ '@bp1': 0, '@bp3': -32 }}
                justify={{ '@bp1': 'flex-start', '@bp3': 'center' }}
                css={{ zIndex: -1 }}
              >
                <Heading
                  id={'edit-profile-dialog__heading'}
                  as='h2'
                  size={{ '@bp1': 3, '@bp3': 4 }}
                  css={{ textAlign: 'center' }}
                >
                  Edit Profile
                </Heading>
              </HStack>
            </Box>
          </Dialog.Header>
          <Dialog.Body pb={70}>
            <Error
              errorEl={<></>}
              hasError={!!error}
              errorMessage={error?.message}
            >
              <Loader loading={loading}>
                <ProfileForm
                  initialValues={parseToProfileFormData(profile)}
                  onFinish={() => onFinish(turnOff)}
                  onSubmit={onSubmit}
                />
              </Loader>
            </Error>
          </Dialog.Body>
          <Dialog.Footer>
            <Box
              h={80}
              w='100%'
              bgColor='primary400'
              position='fixed'
              b={0}
            ></Box>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
EditProfileButton.displayName = 'EditProfileButton';

export default EditProfileButton;
