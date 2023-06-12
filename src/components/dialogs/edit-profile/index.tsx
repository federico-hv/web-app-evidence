import {
  Button,
  Dialog,
  Heading,
  HStack,
  useSwitch,
} from '@holdr-ui/react';
import { ProfileContextProvider } from 'contexts';
import { parseToProfileFormData } from 'utilities';
import { useCurrentUserProfile, useUpdateProfile } from 'lib';
import { ProfileForm } from '../../forms';
import { Error, Loader } from '../../utility';

function EditProfileDialog() {
  const { switchState, turnOff, turnOn } = useSwitch(false);
  const {
    loading: loadingQuery,
    data,
    error: errorQuery,
  } = useCurrentUserProfile();
  const {
    loading: loadingMutation,
    error: errorMutation,
    onSubmit,
    onFinish,
  } = useUpdateProfile();

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
              hasError={!!errorQuery || !!errorMutation}
              errorMessage={errorQuery?.message}
            >
              {data && (
                <Loader loading={loadingQuery || loadingMutation}>
                  <ProfileContextProvider
                    value={{
                      profile: data.profile,
                      loading: loadingMutation,
                    }}
                  >
                    <ProfileForm
                      initialValues={parseToProfileFormData(data.profile)}
                      onFinish={() => onFinish(turnOff)}
                      onSubmit={onSubmit}
                    />
                  </ProfileContextProvider>
                </Loader>
              )}
            </Error>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
EditProfileDialog.displayName = 'EditProfileDialog';

export default EditProfileDialog;
