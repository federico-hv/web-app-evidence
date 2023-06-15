import { Formik, useFormikContext } from 'formik';
import { UpdateAccountInfoSchema } from './account-info.schema';
import {
  AccountInfoFormData,
  AccountInfoFormProps,
} from './account-info.types';
import { FormEvent, useContext } from 'react';
import { Box, Button, HStack, VStack } from '@holdr-ui/react';
import { isInputDisabled } from 'utilities';
import { IAccountInfo } from 'shared';
import { AccountInfoContext } from 'contexts';
import { capitalize } from 'lodash';
import countryList from 'country-list';
import { FormInput } from '../../inputs';

function InnerForm() {
  const countries = Object.keys(countryList.getNameList());
  const { handleSubmit, values, errors } =
    useFormikContext<AccountInfoFormData>();
  // disabled = isEqual(values, pick(data.accountInfo, 'username'))
  const { loading, disabled, name } = useContext(AccountInfoContext);
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
          {name === 'phone' && (
            <FormInput
              disabled={loading}
              name='phone'
              type='text'
              label='Phone'
            />
          )}
          {name === 'email' && (
            <FormInput
              disabled={loading}
              name='email'
              type='text'
              label='Email'
            />
          )}
          {name === 'birthday' && (
            <FormInput disabled={loading} name='birthday' type='date' />
          )}
          {name === 'country' && (
            <FormInput name='country' type='select' label='country'>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {capitalize(country)}
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
