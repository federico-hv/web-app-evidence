import { Button, HStack, Toast, Text, VStack } from '@holdr-ui/react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import { UpdatePasswordFormData } from 'shared';
import { UpdatePasswordContext } from 'contexts';
import { isInputDisabled } from 'utilities';
import { UpdatePasswordFormProps } from './update-password.types';
import { UpdatePasswordSchema } from './update-password.schema';
import { updatePasswordValues } from './data';
import { FormInput } from '../../inputs';
import { ForgotPasswordLink } from '../../links';

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

function UpdatePasswordForm({
  onSubmit,
  onFinish,
}: UpdatePasswordFormProps) {
  const { data: mutationData } = useContext(UpdatePasswordContext);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (mutationData && mutationData.status) setOpen(true);
  }, [setOpen, mutationData]);

  return (
    <Formik
      initialValues={updatePasswordValues}
      validationSchema={UpdatePasswordSchema}
      onSubmit={async (data, { resetForm }) => {
        try {
          await onSubmit(data);
          //  Check if the account-info has been successfully set and reset only then
          if (mutationData && !mutationData.status) return;
          onFinish(resetForm);
        } catch (e) {
          console.error(e);
          return;
        }
      }}
    >
      <>
        <Toast.Item open={open} onOpenChange={setOpen}>
          <Toast.Message
            status='success'
            description={mutationData?.message}
            onCloseClick={() => setOpen(false)}
          />
          <Toast.Viewport />
        </Toast.Item>
        <InnerForm />
      </>
    </Formik>
  );
}
UpdatePasswordForm.displayName = 'UpdatePasswordForm';

export default UpdatePasswordForm;
