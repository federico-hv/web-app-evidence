import { Button, HStack, Text, VStack } from '@holdr-ui/react';
import { Formik, useFormikContext } from 'formik';
import {
  UpdatePasswordContext,
  UpdatePasswordFormData,
  UpdatePasswordFormProps,
  UpdatePasswordSchema,
  updatePasswordValues,
} from '../shared';
import { FormEvent, useContext } from 'react';
import {
  ForgotPasswordLink,
  FormInput,
  isInputDisabled,
  useToast,
} from '../../../shared';

function InnerForm() {
  const { handleSubmit, values, errors } =
    useFormikContext<UpdatePasswordFormData>();
  const { loading, data } = useContext(UpdatePasswordContext);
  return (
    <VStack
      as='form'
      onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
    >
      <VStack gap={3} px={4} pb={5} borderBottom={2} borderColor='base100'>
        <VStack gap={2}>
          <FormInput
            type='password'
            name='currentPassword'
            label='Current password'
            placeholder='··········'
          />
          {data && !data.status && (
            <Text size={2} color='danger'>
              {data.message}
            </Text>
          )}
        </VStack>
        <ForgotPasswordLink />
      </VStack>
      <VStack px={4} py={5} gap={5} borderBottom={2} borderColor='base100'>
        <FormInput
          type='password'
          name='newPassword'
          label='New password'
        />
        <FormInput
          type='password'
          name='newPasswordVerification'
          label='Password confirmation'
        />
      </VStack>
      <HStack p={4} justify='flex-end'>
        <Button
          type='submit'
          loadingText={loading ? '' : 'Saving'}
          isLoading={loading}
          disabled={isInputDisabled(values, errors, [
            'currentPassword',
            'newPassword',
            'newPasswordVerification',
          ])}
        >
          Update
        </Button>
      </HStack>
    </VStack>
  );
}

function UpdatePasswordForm({ onSubmit }: UpdatePasswordFormProps) {
  const { data: mutationData } = useContext(UpdatePasswordContext);
  const { openWith } = useToast();

  return (
    <Formik
      initialValues={updatePasswordValues}
      validationSchema={UpdatePasswordSchema}
      onSubmit={async (data, { resetForm }) => {
        try {
          await onSubmit(data);

          openWith({
            status:
              mutationData && mutationData.status ? 'success' : 'danger',
            description: mutationData
              ? mutationData.message
              : 'Something went wrong. Its definitely not your fault. Please try again later.',
          });

          resetForm();
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
UpdatePasswordForm.displayName = 'UpdatePasswordForm';

export default UpdatePasswordForm;
