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
import {
  extraBtnPadding,
  FormInput,
  ImageUpload,
} from '../../../../shared';
import { ImageUploadContext } from '../../../../shared/components/image-upload/context';
import { ProfileFormProps } from './profile.types';
import { useProfile } from '../../../../shared';
import { profileValues } from './data';
import { ProfileSchema } from './profile.schema';

import lightPlaceholder from '../../../../assets/images/light-placeholder.jpg';

function InnerForm() {
  const { profile, loading } = useProfile();
  const { handleSubmit } = useFormikContext<ProfileFormData>();

  return (
    <VStack
      pt={4}
      pb='80px'
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

      <Box
        position='fixed'
        bgColor='primary400'
        px={4}
        l={0}
        r={0}
        zIndex={100}
        b='20px'
      >
        <Button
          fullWidth
          type='submit'
          isLoading={loading}
          loadingText={loading ? '' : 'Saving'}
          className={extraBtnPadding()}
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
