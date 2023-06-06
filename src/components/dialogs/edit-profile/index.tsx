import {
  Button,
  Dialog,
  Heading,
  HStack,
  useSwitch,
} from '@holdr-ui/react';
import { useAuthContext } from 'hooks';
import { useMutation, useQuery } from '@apollo/client';
import { IProfile, ProfileFormData } from 'shared';
import { GET_PROFILE, UPDATE_PROFILE } from 'lib';
import { ProfileContextProvider } from 'contexts';
import { ProfileForm } from '../../forms';
import { Error, Loader } from '../../utility';
import { parseToProfileFormData } from '../../../utilities';

export interface UpdateProfileModel {
  displayName?: string;
  avatar?: string;
  coverImage?: string;
  biography?: string;
  region?: string;
}

export interface UpdateProfilePayload {
  payload: ProfileFormData;
}

const useMyProfile = () => {
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

  console.log({ data });
  return { data, loading, error };
};

const useUpdateProfileMutation = () => {
  const [updateProfile, { loading, error }] = useMutation<
    UpdateProfileModel,
    UpdateProfilePayload
  >(UPDATE_PROFILE);

  const onSubmit = async (formData: ProfileFormData) => {
    await updateProfile({
      variables: { payload: formData },
    });
  };

  const onFinish = (cb: VoidFunction) => {
    cb();
  };

  return { loading, error, onSubmit, onFinish };
};

function EditProfileDialog() {
  const { switchState, turnOff, turnOn } = useSwitch(false);
  const {
    loading: loadingQuery,
    data,
    error: errorQuery,
  } = useMyProfile();
  const {
    loading: loadingMutation,
    error: errorMutation,
    onSubmit,
    onFinish,
  } = useUpdateProfileMutation();

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
