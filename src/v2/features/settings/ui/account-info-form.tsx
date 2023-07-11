import { FormEvent, useContext } from 'react';
import { Formik, useFormikContext } from 'formik';
import {
  AccountInfoFormContext,
  AccountInfoFormData,
  AccountInfoFormProps,
  IAccountInfo,
} from '../shared';
import { Box, Button, HStack, VStack } from '@holdr-ui/react';
import { FormInput, isInputDisabled } from '../../../shared';
import { UpdateAccountInfoSchema } from '../shared/constants';
import phones from '../../../assets/json/phone.code.json';

function InnerForm() {
  const countries = phones.map(({ name }) => name);
  const { handleSubmit, values, errors } =
    useFormikContext<AccountInfoFormData>();
  const { loading, disabled, name } = useContext(AccountInfoFormContext);
  return (
    <VStack
      as='form'
      onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
    >
      <VStack>
        <Box px={4} pb={5} borderBottom={2} borderColor='base100'>
          {name === 'username' && (
            <FormInput
              disabled={loading}
              name='username'
              type='text'
              label='Username'
            />
          )}
          {name === 'birthday' && (
            <FormInput disabled={loading} name='birthday' type='date' />
          )}
          {name === 'country' && (
            <FormInput name='country' type='select' label='country'>
              {countries.map((country) => (
                <option
                  key={country}
                  value={country}
                  style={{ textTransform: 'capitalize' }}
                >
                  {country}
                </option>
              ))}
            </FormInput>
          )}
        </Box>
      </VStack>
      <HStack p={4} justify='flex-end'>
        <Button
          type='submit'
          loadingText={loading ? '' : 'Saving'}
          isLoading={loading}
          disabled={
            (disabled && disabled(values)) ||
            isInputDisabled(values as IAccountInfo, errors, [
              'username',
              'country',
              'email',
              'phone',
              'birthday',
              'gender',
            ])
          }
        >
          Update
        </Button>
      </HStack>
    </VStack>
  );
}

function AccountInfoForm({
  onSubmit,
  onFinish,
  initialValues,
}: AccountInfoFormProps) {
  return (
    <Formik<AccountInfoFormData>
      initialValues={initialValues}
      validationSchema={UpdateAccountInfoSchema}
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
AccountInfoForm.displayName = 'AccountInfoForm';

export default AccountInfoForm;
