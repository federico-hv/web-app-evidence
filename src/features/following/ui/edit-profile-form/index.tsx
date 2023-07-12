import { FormEvent } from 'react';
import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { Formik, useFormikContext } from 'formik';
import { ProfileFormData } from '../../shared';
import { FormInput, ImageUpload } from '../../../../shared';
import { ImageUploadContext } from '../../../../shared/components/image-upload/context';
import { ProfileFormProps } from './profile.types';
import { profileValues } from './data';
import { ProfileSchema } from './profile.schema';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import lightPlaceholder from '../../../../assets/images/light-placeholder.jpg';
import { useProfile } from '../../../../shared';

function InnerForm() {
  const { profile, loading } = useProfile();
  const { handleSubmit } = useFormikContext<ProfileFormData>();

  return (
    <VStack
      py={4}
      gap={3}
      as='form'
      onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
    >
      <VStack>
        <Text as='label' color='base400' size={2}>
          Avatar
        </Text>
        <HStack w='100%' justify='center' my={3}>
          <ImageUpload
            title='Edit Avatar'
            name='avatar'
            placeholder={profile.avatar}
          >
            <ImageUploadContext.Consumer>
              {({ name, src }) => (
                <Avatar
                  name={name}
                  variant='squircle'
                  size='2xl'
                  css={{ height: 150, width: 150 }}
                  src={src}
                />
              )}
            </ImageUploadContext.Consumer>
          </ImageUpload>
        </HStack>
      </VStack>

      <VStack>
        <Text as='label' color='base400' size={2}>
          Cover Image
        </Text>
        <Box my={3}>
          <ImageUpload
            aspect={3.45}
            title='Edit Avatar'
            name='coverImage'
            placeholder={profile.coverImage || lightPlaceholder}
          >
            <ImageUploadContext.Consumer>
              {({ src }) => (
                <Image w='100%' h={150} alt='cover image' src={src} />
              )}
            </ImageUploadContext.Consumer>
          </ImageUpload>
        </Box>
      </VStack>

      <FormInput
        defaultValue={profile.displayName}
        label='Display Name'
        name='displayName'
        type='text'
      />

      <FormInput
        defaultValue={profile.bio}
        label='Bio'
        name='bio'
        type='textarea'
      />

      <Box position='fixed' zIndex={100} t={16} r={16}>
        <Button
          type='submit'
          isLoading={loading}
          loadingText={loading ? '' : 'Saving'}
          label='Save'
        />
      </Box>
    </VStack>
  );
}

function ProfileForm({
  onSubmit,
  onFinish,
  initialValues,
}: ProfileFormProps) {
  return (
    <Formik<ProfileFormData>
      initialValues={initialValues || profileValues}
      validationSchema={ProfileSchema}
      onSubmit={async (data) => {
        try {
          await onSubmit(data);
          onFinish();
        } catch (e) {
          console.error(e);
          return;
        }
      }}
    >
      <InnerForm />
    </Formik>
  );
}
ProfileForm.displayName = 'ProfileForm';

export default ProfileForm;
