import {
  Button,
  Dialog,
  Heading,
  HStack,
  useSwitch,
} from '@holdr-ui/react';
import { useProfile } from '../../../profile';
import { Error, Loader } from '../../../core';
// Change this crap -> use V2
import { useUpdateProfile } from '../../../../../v1/lib';
import { ProfileForm } from '../../../../../v1/components';
import { parseToProfileFormData } from '../../../../../v1/utilities';

function EditProfileButton() {
  const { switchState, turnOff, turnOn } = useSwitch(false);
  const { profile } = useProfile();
  const { loading, error, onSubmit, onFinish } = useUpdateProfile();

  return (
    <Dialog
      isOpen={switchState}
      onOpen={turnOn}
      onClose={turnOff}
      ariaDescribedBy='edit-profile-modal__heading'
    >
      <Dialog.Trigger>
        <Button size={{ '@bp1': 'base', '@bp4': 'base' }} label='Edit' />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          position='relative'
          h={{ '@bp1': '100vh', '@bp3': 550 }}
          maxHeight={{ '@bp1': '100vh', '@bp3': '85vh' }}
          radius={{ '@bp1': 0, '@bp3': 3 }}
          w={{ '@bp1': '100vw', '@bp3': '90vw' }}
        >
          <Dialog.Header
            borderBottom={2}
            borderColor='base100'
            position='fixed'
          >
            <HStack items='center' flex={1} justify='space-between'>
              <Heading as='h4' size={3}>
                Edit Profile
              </Heading>
            </HStack>
          </Dialog.Header>
          <Dialog.Body>
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
EditProfileButton.displayName = 'EditProfileButton';

export default EditProfileButton;
