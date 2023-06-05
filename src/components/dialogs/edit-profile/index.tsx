import { Button, Dialog, Heading, HStack } from '@holdr-ui/react';
import { useAuthContext } from 'hooks';
import { useQuery } from '@apollo/client';
import { IProfile } from 'shared';
import { GET_PROFILE } from 'lib';
import { ProfileForm } from '../../forms';
import { Error, Loader } from '../../utility';
import { ProfileContextProvider } from '../../../contexts';

function EditProfileDialog() {
  const { currentUser } = useAuthContext();
  // QUERY for profile

  const { data, loading, error } = useQuery<{ profile: IProfile }>(
    GET_PROFILE,
    {
      variables: {
        payload: {
          username: currentUser?.username,
          id: currentUser?.id,
        },
      },
    },
  );

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
          <Dialog.Header borderBottom={2} borderColor='base100'>
            <HStack items='center' flex={1} justify='space-between'>
              <Heading as='h4' size={3}>
                Edit Profile
              </Heading>
              <Button role='submit'>Save</Button>
            </HStack>
          </Dialog.Header>
          <Dialog.Body>
            <Error
              errorEl={<></>}
              hasError={!!error}
              errorMessage={error?.message}
            >
              {data && (
                <Loader loading={loading}>
                  <ProfileContextProvider
                    value={{
                      profile: data.profile,
                    }}
                  >
                    <ProfileForm
                      onFinish={async () => {
                        console.log('eee');
                      }}
                      onSubmit={async () => {
                        console.log('eee');
                      }}
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
