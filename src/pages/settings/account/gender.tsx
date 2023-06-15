import { FormEvent } from 'react';
import {
  Text,
  VStack,
  HStack,
  Button,
  Radio,
  Input,
  Box,
} from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head, Error, Loader } from 'components';
import { CustomLabel1, IAccountInfo, Paths } from 'shared';
import { useUpdateAccountInfo, useAccountInfo } from 'lib';
import { Formik } from 'formik';
import { isInputDisabled, prefix } from 'utilities';
import { isEqual, pick } from 'lodash';
import { AccountInfoFormData } from '../../../components/forms/account-info/account-info.types';
import { UpdateAccountInfoSchema } from '../../../components/forms/account-info/account-info.schema';
import { RootSettingsPath } from '../security/root';

function GenderSettingPage() {
  const {
    loading: loadingQuery,
    error: errorQuery,
    data,
  } = useAccountInfo();

  const {
    loading: loadingMutation,
    error: errorMutation,
    onSubmit,
    onFinish,
  } = useUpdateAccountInfo();

  return (
    <Error
      hasError={!!errorQuery || !!errorMutation}
      errorEl={<Box>{errorQuery?.message || errorMutation?.message}</Box>}
    >
      <Head
        title='Update gender'
        description='Change your gender.'
        url={`${Paths.settings}/${Paths.setting.gender}`}
      />
      <Loader loading={loadingQuery}>
        {data && (
          <HeaderLayout
            title='Gender'
            backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
          >
            <Formik<AccountInfoFormData>
              initialValues={{ gender: data.accountInfo.gender }}
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
              {({ handleSubmit, errors, handleChange, values }) => (
                <VStack
                  as='form'
                  gap={5}
                  p={4}
                  borderBottom={2}
                  borderTop={2}
                  borderColor='base100'
                  onSubmit={(e) =>
                    handleSubmit(e as FormEvent<HTMLFormElement>)
                  }
                >
                  <VStack as='fieldset' gap={5}>
                    <CustomLabel1>
                      <Text id='Gender_Male'>Male</Text>
                      <Radio
                        onChange={handleChange}
                        checked={values.gender === 'Male'}
                        labelledBy='Gender_Male'
                        name='gender'
                        value='Male'
                      />
                    </CustomLabel1>
                    <CustomLabel1>
                      <Text id='Gender_Female'>Female</Text>
                      <Radio
                        onChange={handleChange}
                        checked={values.gender === 'Female'}
                        labelledBy='Gender_Male'
                        name='gender'
                        value='Female'
                      />
                    </CustomLabel1>
                    <CustomLabel1>
                      <Text id='Gender_Specify'>Specify</Text>
                      <Radio
                        onChange={handleChange}
                        checked={
                          !!values.gender &&
                          values.gender.length > 0 &&
                          values.gender !== 'Male' &&
                          values.gender !== 'Female'
                        }
                        labelledBy='Gender_Male'
                        name='gender'
                        value='Specific'
                      />
                    </CustomLabel1>
                  </VStack>
                  {values.gender &&
                    values.gender?.length > 0 &&
                    values.gender !== 'Male' &&
                    values.gender !== 'Female' && (
                      <Input
                        name='gender'
                        value={
                          values.gender === 'Specific' ? '' : values.gender
                        }
                        onChange={handleChange}
                      />
                    )}
                  <HStack p={4} justify='flex-end'>
                    <Button
                      type='submit'
                      loadingText={loadingMutation ? '' : 'Saving'}
                      isLoading={loadingMutation}
                      disabled={
                        values.gender === 'Specific' ||
                        isEqual(
                          values,
                          pick(data.accountInfo, 'gender'),
                        ) ||
                        isInputDisabled(values as IAccountInfo, errors, [
                          'gender',
                        ])
                      }
                    >
                      Update
                    </Button>
                  </HStack>
                </VStack>
              )}
            </Formik>
          </HeaderLayout>
        )}
      </Loader>
    </Error>
  );
}
GenderSettingPage.displayName = 'GenderSettingPage';

export default GenderSettingPage;
