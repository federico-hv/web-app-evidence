import { Avatar, Box, HStack, Image, Text, VStack } from '@holdr-ui/react';
import { Formik, useFormikContext } from 'formik';
import { ProfileFormData } from 'shared';
import { ProfileFormProps } from './profile.types';
import { profileValues } from './data';
import { ImageUpload } from '../../inputs';
import { ProfileSchema } from './profile.schema';
import lightPlaceholder from 'assets/images/light-placeholder.jpg';
import FormInput from '../../inputs/form';
import { useProfileContext } from '../../../contexts';
import { parseToProfileFormData } from '../../../utilities';

function InnerForm() {
  const { profile } = useProfileContext();
  // const { values, errors, handleSubmit } =
  //   useFormikContext<ProfileFormData>();

  return (
    <VStack py={4} gap={3}>
      <VStack>
        <Text as='label' color='base400' size={2}>
          Avatar
        </Text>
        <HStack w='100%' justify='center' my={3}>
          <ImageUpload title='Edit Avatar' name='avatar'>
            <Box>
              <Avatar
                name='avatar'
                variant='squircle'
                size='2xl'
                css={{ height: 150, width: 150 }}
                src={profile.avatar}
              />
            </Box>
          </ImageUpload>
        </HStack>
      </VStack>

      <VStack>
        <Text as='label' color='base400' size={2}>
          Cover Image
        </Text>
        <Box my={3}>
          <Image
            w='100%'
            h={150}
            alt='cover image'
            fallbackSrc={lightPlaceholder}
            src={profile.coverImage}
          />
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
    </VStack>
  );
}

function ProfileForm({ onSubmit, onFinish }: ProfileFormProps) {
  const { profile } = useProfileContext();
  return (
    <Formik<ProfileFormData>
      initialValues={
        profile ? parseToProfileFormData(profile) : profileValues
      }
      validationSchema={ProfileSchema}
      onSubmit={async (data) => {
        try {
          await onSubmit(data);
          onFinish();
        } catch (e) {
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
