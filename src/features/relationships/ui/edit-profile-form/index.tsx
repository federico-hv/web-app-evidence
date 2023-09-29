import { FormEvent, useRef } from 'react';
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
import { IProfile, ProfileFormData } from '../../shared';
import {
  extraBtnPadding,
  FormInput,
  ImageUpload,
  useDimensions,
  useGeneralContext,
} from '../../../../shared';
import { ImageUploadContext } from '../../../../shared/components/image-upload/context';
import { ProfileFormProps } from './profile.types';
import { profileValues } from './data';
import { ProfileSchema } from './profile.schema';

import lightPlaceholder from '../../../../assets/images/light-placeholder.jpg';

function InnerForm() {
  const ref = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(ref);

  const { state: profile } = useGeneralContext<IProfile>();
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
                  css={{
                    '@bp1': { height: 75, width: 75 },
                    '@bp3': { height: 125, width: 125 },
                  }}
                  src={src}
                />
              )}
            </ImageUploadContext.Consumer>
          </ImageUpload>
        </HStack>
      </VStack>

      <VStack innerRef={ref}>
        <Text as='label' color='base400' size={2}>
          Cover Image
        </Text>
        <Box my={3}>
          <ImageUpload
            aspect={3}
            title='Edit Cover Image'
            name='coverImage'
            placeholder={profile.coverImage || lightPlaceholder}
          >
            <ImageUploadContext.Consumer>
              {({ src }) => (
                <Image
                  w='100%'
                  h={dimensions ? dimensions.width / 3 : 0}
                  alt='cover image'
                  src={src}
                />
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
